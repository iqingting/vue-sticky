let listenAction

export default {
  bind(el, binding) {
    const params = binding.value || {}

    const stickyTop = params.stickyTop || 0
    const zIndex = params.zIndex || 1000

    el.style.position = '-webkit-sticky'
    el.style.position = 'sticky'

    // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
    if (~el.style.position.indexOf('sticky')) {
      el.style.top = `${stickyTop}px`
      el.style.zIndex = zIndex
      return
    }

    const elementChild = el.firstElementChild
    elementChild.style.cssText = `left: 0; right: 0; top: ${stickyTop}px; index: ${zIndex}`

    let active = false

    const sticky = () => {
      if (active) {
        return
      }
      if (!el.style.height) {
        el.style.height = el.offsetHeight + 'px'
      }
      elementChild.style.position = 'fixed'
      active = true
    }

    const reset = () => {
      if (!active) {
        return
      }
      elementChild.style.position = ''
      active = false
    }

    const check = () => {
      const offsetTop = el.getBoundingClientRect().top
      if (offsetTop <= stickyTop) {
        sticky()
      } else {
        reset()
      }
    }

    let scrollerTimer // for bad user experience scroll in mobile
    let scrollEndTimer // for clear scrollerTimer when scroll end
    listenAction = () => {
      clearTimeout(scrollEndTimer)
      scrollEndTimer = setTimeout(() => {
        clearInterval(scrollerTimer)
        scrollerTimer = null
      }, 1000)

      if (!scrollerTimer) {
        scrollerTimer = setInterval(check, 30)
      }
    }

    window.addEventListener('scroll', listenAction)
  },

  unbind() {
    window.removeEventListener('scroll', listenAction)
  },
}
