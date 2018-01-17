/*!
 * vue-sticky v4.0.0
 * (c) 2018 Guanghui Ren
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.VueSticky = global.VueSticky || {})));
}(this, (function (exports) { 'use strict';

var listenAction;
var stickyTop;
var zIndex;

var Sticky = {
  bind: function bind (el, binding, vnode) {
    var elStyle = el.style;
    var params = binding.value || {};
    stickyTop = params.stickyTop || 0;
    zIndex = params.zIndex || 1000;

    elStyle.position = '-webkit-sticky';
    elStyle.position = 'sticky';

    // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
    if (~elStyle.position.indexOf('sticky')) {
      elStyle.top = stickyTop + "px";
      elStyle.zIndex = zIndex;
      return
    }

    elStyle.position = 'relative';

    var childStyle = el.firstElementChild.style;
    childStyle.cssText = "left: 0; right: 0; top: " + stickyTop + "px; z-index: " + zIndex + "; " + (childStyle.cssText);

    var active = false;

    var sticky = function () {
      if (active) {
        return
      }
      if (!elStyle.height) {
        elStyle.height = (el.offsetHeight) + "px";
      }
      childStyle.willChange = 'transform';
      childStyle.position = 'fixed';
      active = true;
    };

    var reset = function () {
      if (!active) {
        return
      }
      childStyle.position = 'absolute';
      active = false;
    };

    var check = function () {
      var offsetTop = el.getBoundingClientRect().top;
      if (offsetTop <= stickyTop) {
        sticky();
        return
      }
      reset();
    };

    listenAction = function () {
      if (!window.requestAnimationFrame) {
        return setTimeout(check, 16)
      }

      window.requestAnimationFrame(check);
    };

    window.addEventListener('scroll', listenAction);
  },

  unbind: function unbind () {
    window.removeEventListener('scroll', listenAction);
  },

  update: function update (el, binding) {
    var params = binding.value || {};
    stickyTop = params.stickyTop || 0;
    zIndex = params.zIndex || 1000;

    var childStyle = el.firstElementChild.style;
    el.style.top = childStyle.top = stickyTop + "px";
    el.style.zIndex = childStyle.zIndex = zIndex;
  }
};

function plugin (Vue) {
  Vue.directive('Sticky', Sticky);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

var version = '4.0.0';

exports['default'] = plugin;
exports.Sticky = Sticky;
exports.version = version;

Object.defineProperty(exports, '__esModule', { value: true });

})));
