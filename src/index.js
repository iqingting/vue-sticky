const VueSticky = {
  params: [
    // sticky 元素固定相对屏幕高度
    'sticky-top',
    // fixed 时 元素的z-index
    'z-index',
  ],
  bind() {
    const stickyTop = this.params.stickyTop || 0;
    const zIndex = this.params.zIndex || 1000;

    this.el.style.position = '-webkit-sticky';
    this.el.style.position = 'sticky';

    if (~this.el.style.position.indexOf('sticky')) {
      // 浏览器支持原生 sticky 效果（Currently Safari, Firefox and Chrome Canary）
      this.el.style.top = `${stickyTop}px`;
      this.el.style.zIndex = zIndex;
      return;
    }

    const elementChild = this.el.firstElementChild;
    elementChild.style.left = 0;
    elementChild.style.right = 0;
    elementChild.style.top = `${stickyTop}px`;
    elementChild.style.zIndex = zIndex;

    const check = () => {
      const offsetTop = this.el.getBoundingClientRect().top;
      if (offsetTop <= this.params.stickyTop) {
        if (!this.el.style.height) {
          this.el.style.height = this.el.clientHeight + 'px';
        }
        elementChild.style.position = 'fixed';
      } else {
        elementChild.style.position = '';
      }
    };

    var timer;
    this.__listenAction = () => {
      if (timer) return;
      timer = setInterval(check, 30);
    }

    window.addEventListener('scroll', this.__listenAction);
  },
  unbind() {
    if (this.__listenAction) {
      window.removeEventListener('scroll', this.__listenAction);
    }
  },
};

export default VueSticky;
