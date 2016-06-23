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
    const element = this.el;

    element.style.position = '-webkit-sticky';
    element.style.position = 'sticky';

    if (~element.style.position.indexOf('sticky')) {
      // 浏览器支持原生 sticky 效果（Currently Safari, Firefox and Chrome Canary）
      element.style.top = `${stickyTop}px`;
      element.style.zIndex = zIndex;
      return;
    }

    const elementChild = element.firstElementChild;
    elementChild.style.left = 0;
    elementChild.style.right = 0;
    elementChild.style.top = `${stickyTop}px`;
    elementChild.style.zIndex = zIndex;

    let active = false;

    const check = () => {
      const offsetTop = element.getBoundingClientRect().top;
      if (offsetTop <= stickyTop) {
        if (active) return;
        if (!element.style.height) {
          element.style.height = element.clientHeight + 'px';
        }
        elementChild.style.position = 'fixed';
        active = true;
      } else {
        if (!active) return;
        elementChild.style.position = '';
        active = false;
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
