const VueSticky = {
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

    this.__listenAction = () => {
      if (!this.vm) return;

      if (!stickyElementData.height) {
        stickyElementData.height = this.el.offsetHeight;
        stickyElementData.offsetTop = this.el.offsetTop;
        holder.style.height = `${stickyElementData.height}px`;
        holder.style.visibility = 'hidden';
        this.el.style.width = '100%';
      }

      if (getScrollTop() <= stickyElementData.offsetTop) {
        if (!active) return;
        active = false;
        this.el.style.position = '';
        this.el.parentElement.removeChild(holder);
        this.vm.$dispatch('STICKY_STATE', {
          isSticky: false,
          el: this.el,
        });
      } else {
        if (active) return;
        active = true;
        this.el.style.position = 'fixed';
        this.el.style.top = `${this.params.stickyTop || 0}px`;
        this.el.style.zIndex = `${this.params.zIndex || 1000}`;
        this.el.parentElement.insertBefore(holder, this.el);
        this.vm.$dispatch('STICKY_STATE', {
          isSticky: true,
          el: this.el,
        });
      }
    };

    var timer = null;
    window.addEventListener('scroll', () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => this.__listenAction(), 20);
    });
  },
  unbind() {
    window.removeEventListener('scroll', this.__listenAction);
  },
};

export default VueSticky;
