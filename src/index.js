let listenAction
let supportCSSSticky

export default {
  bind(el, binding) {

    const elStyle = el.style
    const params = binding.value || {}
    let stickyTop = params.stickyTop || 0
    let zIndex = params.zIndex || 1000
    let disabled = params.disabled
    let childStyle

    if (disabled) {
      return
    }

    elStyle.position = '-webkit-sticky'
    elStyle.position = 'sticky'

    // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
    supportCSSSticky = ~elStyle.position.indexOf('sticky')
    if (supportCSSSticky) {
      elStyle.top = `${stickyTop}px`
      elStyle.zIndex = zIndex
    } else {
      elStyle.position = ''
      if (el.firstElementChild) {
        childStyle = el.firstElementChild.style
        childStyle.cssText = `left: 0; right: 0; top: ${stickyTop}px; z-index: ${zIndex}; ${childStyle.cssText}`
      } else {
        if (window.console && window.console.warn) {
          window.console.warn('el.firstElementChild is undefined or null', el)
        }
      }
    }

    let active = false

    const sticky = () => {
      let className = binding.value.className
      if (className) {
        el.classList.add(className)
      }
      if ( !supportCSSSticky ) {
        if (active) {
          return
        }
        if (!elStyle.height) {
          elStyle.height = `${el.offsetHeight}px`
        }
        if (childStyle) {
          childStyle.position = 'fixed'
        }

        active = true
      }
    }

    const reset = () => {
      let className = binding.value.className
      if (className) {
        el.classList.remove(className)
      }
      if (!supportCSSSticky) {
        if (!active) {
          return
        }
        if (childStyle) {
          childStyle.position = ''
        }
        active = false
      }
    }

    const check = () => {
      let disabled = binding.value.disabled
      let stickyTop = binding.value.stickyTop
      if (!disabled) {
        const offsetTop = el.getBoundingClientRect().top
        if (offsetTop <= stickyTop) {
          sticky()
          return
        }
        reset()
      }
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
    const params = binding.value || {}
    let stickyTop = params.stickyTop || 0
    let zIndex = params.zIndex || 1000
    let className = params.className
    let disabled = params.disabled
    let childStyle
    childStyle = el.firstElementChild && el.firstElementChild.style

    if (!disabled) {
      stickyTop = params.stickyTop || 0
      zIndex = params.zIndex || 1000

      elStyle.position = '-webkit-sticky'
      elStyle.position = 'sticky'
      elStyle.top = `${stickyTop}px`
      elStyle.zIndex = zIndex

      if (!supportCSSSticky && childStyle) {
        childStyle.top = `${stickyTop}px`
        childStyle.zIndex = zIndex
      }
    } else {
      elStyle.position = ''
      elStyle.top = ''
      elStyle.zIndex = ''
      elStyle.height = ''
      if (className) {
        el.classList.remove(className)
      }
      if (childStyle) {
        childStyle.position = ''
        childStyle.top = ''
        childStyle.zIndex = ''
        childStyle.height = ''
      }
    }
  }
}
