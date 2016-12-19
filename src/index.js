const VueSticky = {
  params: [
    // sticky 元素固定相对屏幕高度
    'sticky-top',
    // fixed 时 元素的z-index
    'z-index',
  ],
  bind(element, bindings) {
    const params = (this && this.params) ? this.params : null,
      stickyTop = ((params && this.params.stickyTop) ?
        this.params.stickyTop :
        bindings.value.stickyTop) || 0,
      zIndex = ((params && this.params.stickyTop) ?
        this.params.stickyTop :
        bindings.value.zIndex) || 1000;

    element.style.position = '-webkit-sticky';
    element.style.position = 'sticky';

    /* eslint-disable no-bitwise */
    if (~element.style.position.indexOf('sticky')) {
      /* eslint-enable no-bitwise */
      // 浏览器支持原生 sticky 效果（Currently Safari, Firefox and Chrome Canary）
      element.style.top = `${stickyTop}px`;
      element.style.zIndex = zIndex;
      return;
    }
    const elementChildStyle = element.firstElementChild.style;
    elementChildStyle.left = 0;
    elementChildStyle.right = 0;
    elementChildStyle.top = `${stickyTop}px`;
    elementChildStyle.zIndex = zIndex;

    /* eslint-disable vars-on-top */
    /* eslint-disable no-var */
    var vueStickyActiveVariable = false;
    /* eslint-enable vars-on-top */
    /* eslint-enable no-var */

    const check = () => {
      const offsetTop = element.getBoundingClientRect().top;
      if (offsetTop <= stickyTop) {
        if (vueStickyActiveVariable) return;
        if (!element.style.height) {
          element.style.height = `${element.clientHeight}px`;
        }
        elementChildStyle.position = 'fixed';
        vueStickyActiveVariable = true;
      } else {
        if (!vueStickyActiveVariable) return;
        elementChildStyle.position = '';
        vueStickyActiveVariable = false;
      }
    };

    let vueStickyTimerVariable;
    const vueStickyListenAction = () => {
      if (vueStickyTimerVariable) return;
      vueStickyTimerVariable = setInterval(check, 200);
    };
    /* eslint-disable no-undef */
    window.addEventListener('scroll', vueStickyListenAction);
  },
  unbind() {
    if (vueStickyListenAction) {
      window.removeEventListener('scroll', vueStickyListenAction);
    }
  },
  /* eslint-enable no-undef */
};

export default VueSticky;
