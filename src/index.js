const VueSticky = {
  params: [
    // sticky 元素固定相对屏幕高度
    'sticky-top',
    // fixed 时 元素的z-index
    'z-index',
  ],
  bind(element, bindings) {
    const stickyTop = bindings.value.stickyTop || 0,
      zIndex = bindings.value.zIndex || 1000,
      transition = bindings.value.transition || 'none',
      elementStyle = element.style;

    elementStyle.position = '-webkit-sticky';
    elementStyle.position = 'sticky';
    elementStyle.transition = transition;

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

    let vueStickyActiveVariable = false;

    const check = () => {
      const offsetTop = element.getBoundingClientRect().top;
      if (offsetTop <= stickyTop) {
        if (vueStickyActiveVariable) return;
        if (!elementStyle.height) {
          elementStyle.height = `${element.clientHeight}px`;
        }
        elementChild.style.position = 'fixed';
        vueStickyActiveVariable = true;
      } else {
        if (!vueStickyActiveVariable) return;
        elementChild.style.position = '';
        vueStickyActiveVariable = false;
      }
    };

    let vueStickyTimerVariable;
    const vueStickyListenAction = () => {
      if (vueStickyTimerVariable) return;
      vueStickyTimerVariable = setInterval(check, 30);
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
