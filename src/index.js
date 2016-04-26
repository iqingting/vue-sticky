const directiveSticky = {
  params: [
    // sticky 元素脱离文档流时填补的高度
    'holder-height',
    // sticky 元素固定相对屏幕高度
    'sticky-top',
    // fix 时 元素的z-index
    'z-index',
  ],
  bind() {
    const holder = document.createElement('div');
    var stickyElementData = {};
    var active = false;

    const getScrollTop = () => Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    this.__listenEvent = 'ontouchmove' in window ? 'touchmove' : 'scroll';

    this.__listenAction = () => {
      if (!this.vm) return;

      if (!stickyElementData.height) {
        stickyElementData.height = this.el.offsetHeight;
        stickyElementData.offsetTop = this.el.offsetTop;
        holder.style.height = `${stickyElementData.height}px`;
        holder.style.visibility = 'hidden';
        this.el.style.width = '100%';
      }

      if (getScrollTop() < stickyElementData.offsetTop) {
        if (!active) return;
        active = false;
        this.el.style.position = '';
        this.vm.$el.parentElement.removeChild(holder);
      } else {
        if (active) return;
        active = true;
        this.el.style.position = 'fixed';
        this.el.style.top = `${this.params.stickyTop || 0}px`;
        this.el.style.zIndex = `${this.params.zIndex || 1000}`;
        this.vm.$el.parentElement.insertBefore(holder, this.vm.$el);
      }
    };

    var timer = null;
    window.addEventListener(this.__listenEvent, () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => this.__listenAction(), 30);
    });
  },
  unbind() {
    if (this.__listenAction) {
      window.removeEventListener(this.__listenEvent, this.__listenAction);
    }
  },
};

export default directiveSticky;
