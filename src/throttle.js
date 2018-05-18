export default (fn, delay = 100) => {
  let now, lastExec, timer, context, args

  function execute() {
    fn.apply(context, args)
    lastExec = now
  }

  return () => {
    context = this
    args = arguments

    now = + new Date()

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (!lastExec) {
      execute()
    } else {
      var diff = delay - (now - lastExec)
      if (diff < 0) {
        execute()
      } else {
        timer = setTimeout(function() {
          execute()
        }, diff)
      }
    }
  }
}