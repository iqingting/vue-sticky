let listenAction

export default {
  bind(el, binding) {
    const params = binding.value || {}
    const stickyTop = params.stickyTop || 0
    const zIndex = params.zIndex || 1000
    const elStyle = el.style

    elStyle.position = '-webkit-sticky'
    elStyle.position = 'sticky'

    // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
    if (~elStyle.position.indexOf('sticky')) {
      elStyle.top = `${stickyTop}px`
      elStyle.zIndex = zIndex
      return
    }

    const elementChild = el.firstElementChild.style
    elementChild.cssText = `left: 0; right: 0; top: ${stickyTop}px; index: ${zIndex}`

    let active = false

    const sticky = () => {
      if (active) {
        return
      }
      if (!elStyle.height) {
        elStyle.height = `${el.offsetHeight}px`
      }
      elementChild.position = 'fixed'
      active = true
    }

    const reset = () => {
      if (!active) {
        return
      }
      elementChild.position = ''
      active = false
    }

    const check = () => {
      const offsetTop = el.getBoundingClientRect().top
      if (offsetTop <= stickyTop) {
        sticky()
        return
      }
      reset()
    }

    listenAction = () => {
      setTimeout(check, 300);
    }

    window.addEventListener('scroll', listenAction)
  },

  unbind() {
    window.removeEventListener('scroll', listenAction)
  },

  update(el, binding) {
    const params = binding.value || {}
    el.style.top = `${params.stickyTop}px`
    el.style.zIndex = params.zIndex
  },
}
