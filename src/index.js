let listenAction
let stickyTop
let zIndex
let className
let childStyle

export default {
  bind(el, binding) {
    if (!binding.value) {
      return
    }
    const elStyle = el.style
    const params = binding.value || {}
    stickyTop = params.stickyTop || 0
    zIndex = params.zIndex || 1000
    className = params.className || 'vue-sticky'

    elStyle.position = '-webkit-sticky'
    elStyle.position = 'sticky'

    // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
    if (~elStyle.position.indexOf('sticky')) {
      elStyle.top = `${stickyTop}px`
      elStyle.zIndex = zIndex
      return
    }

    if (el.firstElementChild) {
      childStyle = el.firstElementChild.style
      childStyle.cssText = `left: 0; right: 0; top: ${stickyTop}px; z-index: ${zIndex}; ${childStyle.cssText}`
    } else {
      if (window.console && window.console.warn) {
        window.console.warn('el.firstElementChild is undefined or null', el)
      }
    }

    let active = false

    const sticky = () => {
      if (active) {
        return
      }
      if (!elStyle.height) {
        elStyle.height = `${el.offsetHeight}px`
      }
      if (childStyle) {
        childStyle.position = 'fixed'
      }
      el.classList.add(className)
      active = true
    }

    const reset = () => {
      if (!active) {
        return
      }
      if (childStyle) {
        childStyle.position = ''
      }
      active = false
    }

    const check = () => {
      const offsetTop = el.getBoundingClientRect().top
      if (stickyTop !== null && offsetTop <= stickyTop) {
        sticky()
        return
      }
      reset()
    }

    listenAction = () => {
      if(!window.requestAnimationFrame){
        return setTimeout(check, 16)
      }

      window.requestAnimationFrame(check)
    }

    window.addEventListener('scroll', listenAction)
  },

  unbind() {
    window.removeEventListener('scroll', listenAction)
  },

  update(el, binding) {
    const elStyle = el.style
    let childStyle = el.firstElementChild && el.firstElementChild.style
    if (binding.value) {
      const params = binding.value || {}
      stickyTop = params.stickyTop || 0
      zIndex = params.zIndex || 1000
      className = params.className
      el.classList.add(className)

      elStyle.position = '-webkit-sticky'
      elStyle.position = 'sticky'
      elStyle.top = `${stickyTop}px`
      elStyle.zIndex = zIndex

      if (childStyle) {
        childStyle.top = `${stickyTop}px`
        childStyle.zIndex = zIndex
      }
    } else {
      stickyTop = null
      elStyle.position = ''
      elStyle.top = ''
      elStyle.zIndex = ''
      elStyle.height = ''
      el.classList.remove(className)
      if (childStyle) {
        childStyle.position = ''
        childStyle.top = ''
        childStyle.zIndex = ''
        childStyle.height = ''
      }

    }
  }
}
