!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueSticky=t():e.VueSticky=t()}(this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,o,r,s,u;t.default={bind:function(e,t){if(t.value){var n=e.style,l=t.value||{};if(o=l.stickyTop||0,r=l.zIndex||1e3,s=l.className||"vue-sticky",n.position="-webkit-sticky",n.position="sticky",~n.position.indexOf("sticky"))return n.top=o+"px",void(n.zIndex=r);e.firstElementChild?(u=e.firstElementChild.style,u.cssText="left: 0; right: 0; top: "+o+"px; z-index: "+r+"; "+u.cssText):window.console&&window.console.warn&&window.console.warn("el.firstElementChild is undefined or null",e);var c=!1,d=function(){c||(n.height||(n.height=e.offsetHeight+"px"),u&&(u.position="fixed"),e.classList.add(s),c=!0)},f=function(){c&&(u&&(u.position=""),c=!1)},a=function(){if(e.getBoundingClientRect().top<=o)return void d();f()};i=function(){if(!window.requestAnimationFrame)return setTimeout(a,16);window.requestAnimationFrame(a)},window.addEventListener("scroll",i)}},unbind:function(){window.removeEventListener("scroll",i)},update:function(e,t){if(t.value){var n=t.value||{};o=n.stickyTop||0,r=n.zIndex||1e3,s=n.className;var i=e.firstElementChild.style;e.style.top=i.top=o+"px",e.style.zIndex=i.zIndex=r,e.classList.add(s)}else{var u=e.firstElementChild.style;e.style.top=u.top="",e.style.zIndex=u.zIndex="",e.classList.remove(s)}}}}])});