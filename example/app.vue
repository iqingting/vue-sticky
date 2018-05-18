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

    update() {
      this.stickyConfig.disabled = false
      this.stickyConfig.stickyTop = Math.ceil((Math.random() * 300) % 100)
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
      <button @click="update">update sticky top value</button>
    </div>
  </div>

  <hr>

  <div v-sticky="stickyConfig">
    <nav>
      <div>
        {{ msg }}
        <pre>{{ stickyConfig }}</pre>
      </div>
    </nav>
  </div>

  <p v-for="item in 100" :key="item">{{ item }}</p>
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
