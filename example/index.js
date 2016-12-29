import Vue from 'vue'
import App from './app.vue'

Vue.config.debug = true

new Vue({
  el: '#app',
  render: h => h(App),
})
