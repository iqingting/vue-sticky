import throttle from './throttle'

let listenAction
let supportCSSSticky

const getBindingConfig = binding => {
  const params = binding.value || {}
  let stickyTop = params.stickyTop || 0
  let zIndex = params.zIndex || 1000
  let disabled = params.disabled
  return { stickyTop, zIndex, disabled }
}

const getInitialConfig = el => {
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
    initialConfig = getInitialConfig(el)
    const { disabled, stickyTop, zIndex } = bindingConfig

    if (disabled) return

    const elStyle = el.style
    elStyle.position = '-webkit-sticky'
    elStyle.position = 'sticky'

    let childStyle = el.firstElementChild.style

    // test if the browser support css sticky
    supportCSSSticky = ~elStyle.position.indexOf('sticky')

    if (supportCSSSticky) {
      elStyle.top = `${stickyTop}px`
      elStyle.zIndex = zIndex
    } else {
      elStyle.position = ''
      childStyle.cssText = `left: 0; right: 0; top: ${stickyTop}px; z-index: ${zIndex}; ${childStyle.cssText}`
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
      const offsetTop = el.getBoundingClientRect().top
      if (offsetTop <= stickyTop) {
        return sticky()
      }
      reset()
    })

    watch()
  },

  unbind: unwatch,

  update(el, binding) {
    bindingConfig = getBindingConfig(binding)
    const { stickyTop, zIndex } = bindingConfig

    let childStyle = el.firstElementChild.style
    if (supportCSSSticky) {
      el.style.top = `${stickyTop}px`
      el.style.zIndex = zIndex
    } else {
      childStyle.top = `${stickyTop}px`
      childStyle.zIndex = zIndex
    }

    if (bindingConfig.disabled) {
      if (supportCSSSticky) {
        el.style.position = ''
      } else {
        childStyle.position = ''
        childStyle.top = ''
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
