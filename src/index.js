import throttle from './throttle'

let listenAction
let supportCSSSticky

const getBindingConfig = binding => {
  const params = binding.value || {}
  let stickyTop = params.stickyTop || 0
  let stickyBottom = params.stickyBottom || 0
  let zIndex = params.zIndex || 1000
  let disabled = params.disabled
  return { stickyTop, stickyBottom, zIndex, disabled }
}

const getInitialiConfig = el => {
  return {
    zIndex: el.style.zIndex,
  }
}

const unwatch = () => {
  window.removeEventListener('scroll', listenAction)
}
const watch = () => {
  window.addEventListener('scroll', listenAction)
}

let bindingConfig = {}
let initialConfig = {}

export default {
  bind(el, binding) {
    bindingConfig = getBindingConfig(binding)
    initialConfig = getInitialiConfig(el)
    const { disabled, stickyTop, stickyBottom, zIndex } = bindingConfig

    if (disabled) return

    const elStyle = el.style
    elStyle.position = '-webkit-sticky'
    elStyle.position = 'sticky'

    let childStyle = el.firstElementChild.style

    // test if the browser support css sticky
    supportCSSSticky = ~elStyle.position.indexOf('sticky')

    if (supportCSSSticky) {
      if (stickyTop >= 0) {
        elStyle.top = `${stickyTop}px`
      } else {
        elStyle.bottom = `${stickyBottom}px`
      }
      
      elStyle.zIndex = zIndex
    } else {
      elStyle.position = ''
      if (stickyTop >= 0) {
        childStyle.cssText = `left: 0; right: 0; top: ${stickyTop}px; bottom: auto; z-index: ${zIndex}; ${childStyle.cssText}`
      } else {
        childStyle.cssText = `left: 0; right: 0; top: auto; bottom: ${stickyBottom}px; z-index: ${zIndex}; ${childStyle.cssText}`
      }
    }

    let active = false

    const sticky = () => {
      if (supportCSSSticky || active) return
      if (!elStyle.height) {
        elStyle.height = `${el.offsetHeight}px`
      }
      if (childStyle) {
        childStyle.position = 'fixed'
      }
      active = true
    }

    const reset = () => {
      if (supportCSSSticky || !active) return
      childStyle.position = 'static'
      active = false
    }

    listenAction = throttle(() => {
      if (stickyTop >= 0) {
        const offsetTop = el.getBoundingClientRect().top
        if (offsetTop <= stickyTop) {
          return sticky()
        }
      } else {
        const offsetBottom = el.getBoundingClientRect().bottom        
        if (offsetBottom >= window.innerHeight - stickyBottom) {
          return sticky()
        }
      }
      
      reset()
    })

    watch()
  },

  unbind: unwatch,

  update(el, binding) {
    bindingConfig = getBindingConfig(binding)
    const { stickyTop, stickyBottom, zIndex } = bindingConfig

    let childStyle = el.firstElementChild.style
    if (supportCSSSticky) {
      if (stickyTop >= 0) {
        el.style.top = `${stickyTop}px`
      } else {
        el.style.bottom = `${stickyBottom}px`
      }
      el.style.zIndex = zIndex
    } else {
      if (stickyTop >= 0) {
        childStyle.top = `${stickyTop}px`
        childStyle.bottom = ''
      } else {
        childStyle.bottom = `${stickyBottom}px`
        childStyle.top = ''
      }
      childStyle.zIndex = zIndex
    }

    if (bindingConfig.disabled) {
      if (supportCSSSticky) {
        el.style.position = ''
      } else {
        childStyle.position = ''
        childStyle.top = ''
        childStyle.bottom = ''
        childStyle.zIndex = initialConfig.zIndex
        unwatch()
      }
      return
    }

    if (supportCSSSticky) {
      el.style.position = '-webkit-sticky'
      el.style.position = 'sticky'
    } else {
      watch()
    }
  },
}
