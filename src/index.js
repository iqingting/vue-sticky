import { nextTick } from 'vue';

/**
 * <!-- Usage -->
 * <ELEMENT v-sticky
 *     :z-index="NUMBER"
 *     :sticky-top="NUMBER"
 *     :holder-height="NUMBER || CSS_LENGTH">
 *   <div> <!-- sticky wrapper, IMPORTANT -->
 *     CONTENT
 *   </div>
 * </ELEMENT>
 */

const VueSticky = {
  params: [
    // sticky 元素脱离文档流时填补的高度，如果不填则动态获取
    'holder-height',
    // sticky 元素固定相对屏幕高度
    'sticky-top',
    // fixed 时 元素的z-index
    'z-index',
  ],
  bind() {
    function getCssLengthValue(value) {
      if (typeof value === 'number') {
        return value + 'px';
      } else {
        return String(value);
      }
    }

    this.params.stickyTop = this.params.stickyTop || 0;
    this.params.zIndex = this.params.zIndex || 1000;

    this.el.style.position = '-webkit-sticky';
    this.el.style.position = 'sticky';

    if (~this.el.style.position.indexOf('sticky')) {
      // 浏览器支持原生 sticky 效果（Currently Safari, Firefox and Chrome Canary）
      this.el.style.top = this.params.stickyTop + 'px';
      this.el.style.zIndex = this.params.zIndex;
    } else {
      // 设置占位符高度
      if (this.params.holderHeight != null) {
        this.el.style.height = getCssLengthValue(this.params.holderHeight);
      } else {
        nextTick(() => this.el.style.height = this.el.clientHeight + 'px');
      }

      const elementChild = this.el.firstElementChild;
      elementChild.style.left = 0;
      elementChild.style.right = 0;
      elementChild.style.top = this.params.stickyTop + 'px';
      elementChild.style.zIndex = this.params.zIndex;

      this.__listenAction = () => {
        const offsetTop = this.el.getBoundingClientRect().top;
        if (offsetTop < this.params.stickyTop) {
          elementChild.style.position = 'fixed';
        } else {
          elementChild.style.position = '';
        }
      };

      window.addEventListener('scroll', this.__listenAction);
    }
  },
  unbind() {
    window.removeEventListener('scroll', this.__listenAction);
  },
};

export default VueSticky;
