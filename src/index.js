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
      childStyle.top = `${stickyTop}px`
      childStyle.zIndex = zIndex
    }

    let active = false

    const sticky = (left, right) => {
      if (supportCSSSticky || active) return
      if (!elStyle.height) {
        elStyle.height = `${el.offsetHeight}px`
      }
      if (childStyle) {
        childStyle.position = 'fixed'
        childStyle.left = `${left}px`
        childStyle.right = `${right}px`
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
      const offsetLeft = el.getBoundingClientRect().left
      const windowWidth = document.documentElement.clientWidth
      const offsetRight = el.getBoundingClientRect().right
      console.log(el.getBoundingClientRect())
      if (offsetTop <= stickyTop) {
        return sticky(offsetLeft, windowWidth-offsetRight)
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
