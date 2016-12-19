const VueSticky = {
  params: [
    'sticky-top',
    'z-index',
  ],
  bind(element, bindings) {
    const params = (this && this.params) ? this.params : null,
      stickyTop = ((params && this.params.stickyTop) ?
        this.params.stickyTop :
        bindings.value.stickyTop) || 0,
      zIndex = ((params && this.params.stickyTop) ?
        this.params.stickyTop :
        bindings.value.zIndex) || 1000,
      elementStyle = (this && this.el ? this.el : element).style;

    elementStyle.position = '-webkit-sticky';
    elementStyle.position = 'sticky';

    /* eslint-disable no-bitwise */
    if (~elementStyle.position.indexOf('sticky')) {
      /* eslint-enable no-bitwise */
      // 浏览器支持原生 sticky 效果（Currently Safari, Firefox and Chrome Canary）
      elementStyle.top = `${stickyTop}px`;
      elementStyle.zIndex = zIndex;
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
        if (!elementStyle.height) {
          elementStyle.height = `${element.clientHeight}px`;
        }
        elementChildStyle.position = 'fixed';
        vueStickyActiveVariable = true;
      } else {
        if (!vueStickyActiveVariable) return;
        elementChildStyle.position = '';
        vueStickyActiveVariable = false;
      }
    };

    const vueStickyListenAction = () => {
      setTimeout(check, 300);
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
