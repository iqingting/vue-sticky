import Vue from 'vue'
import App from './app.vue'

Vue.config.debug = true

new Vue({
  el: 'body',
  components: {
    'app': App,
  },
})
