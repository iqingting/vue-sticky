<script>
import VueSticky from '../src/index.js'

export default {
  name: 'App',
  data() {
    return {
      loading: true,
      stickyConfig: {
        zIndex: 80,
        stickyTop: 10,
        stickyBottom: null,
        disabled: false
      },
      stickyConfigBackup: {},
      msg: 'I am sticky :)'
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  directives: {
    'sticky': VueSticky,
  },
  watch: {
    'stickyConfig.disabled' (value) {
      this.msg = 'I am NOT sticky :('
      if (!value) {
        this.msg = 'I am sticky :)'
      }
    }
  },
  methods: {
    disable() {
      this.stickyConfig.disabled = true
    },

    updateTop() {
      this.stickyConfig.disabled = false
      this.stickyConfig.stickyTop = Math.ceil((Math.random() * 300) % 100)
      this.stickyConfig.stickyBottom = null
    },

    updateBottom() {
      this.stickyConfig.disabled = false
      this.stickyConfig.stickyBottom = Math.ceil((Math.random() * 300) % 100)
      this.stickyConfig.stickyTop = null
    }
  }
}
</script>

<template>
<div>
  <p v-for="item in ['before', 'sticky', 'enabled']" :key="item">{{ item }}</p>

  <div v-sticky="{ zIndex: 100, stickyTop: 20, className: 'sticky-buttons' }">
    <div>
      <button @click="disable">disable sticky</button>
      <button @click="updateTop">update sticky top value</button>
      <button @click="updateBottom">update sticky bottom value</button>      
    </div>
  </div>

  <hr>

  <div v-show="stickyConfig.stickyTop >= 0" v-sticky="stickyConfig">
    <nav>
      <div>
        {{ msg }} top
        <pre>{{ stickyConfig }}</pre>
      </div>
    </nav>
  </div>

  <p v-for="item in 100" :key="item">{{ item }}</p>

  <div v-show="stickyConfig.stickyBottom >= 0" v-sticky="stickyConfig">
    <nav>
      <div>
        {{ msg }} bottom
        <pre>{{ stickyConfig }}</pre>
      </div>
    </nav>
  </div>

  <p v-for="item in 'abcde'" :key="item">{{ item }}</p>
</div>
</template>

<style>
  body {
    margin: 0;
    font-size: 2em;
    text-align: center;
  }
  p {
    line-height: 1.2;
  }
  nav {
    background-color: #eee;
    opacity: 0.8;
    line-height: 3;
    box-shadow: 0 8px 20px 0 rgba(0,0,0,.2);
  }

  pre{
    font-size: 0.8rem;
    line-height: normal;
  }

  button {
    font-size: 1.5rem;
  }
</style>
