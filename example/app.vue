<script>
import VueSticky from '../src/index.js'

export default {
  name: 'App',
  data() {
    return {
      fillArray: Array(100).fill().map((item, index) => item = index),
      loading: true,
      stickyConfig: {
        zIndex: 80,
        stickyTop: 10,
        className: 'sticky-element'
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
    stickyConfig (value) {
      this.msg = 'I am NOT sticky :('
      if (value) {
        this.msg = 'I am sticky :)'
      }
    }
  },
  methods: {
    disable () {
      if (this.stickyConfig) {
        this.stickyConfigBackup = this.stickyConfig
      }
      this.stickyConfig = null
    },

    update () {
      if (!this.stickyConfig) {
        this.stickyConfig = Object.assign(this.stickyConfigBackup, this.stickyConfig)
      }
      this.stickyConfig.stickyTop = Math.ceil((Math.random() * 300) % 200)
    }
  }
}
</script>

<template>
<div>
  <div v-sticky="{zIndex: 100, stickyTop: 10, className: 'sticky-buttons'}">
    <div>
      <button @click="disable">
        disable sticky
      </button>

      <button @click="update">
        update sticky top value
      </button>
    </div>
  </div>

  <p v-for="item in ['before', 'sticky', 'enabled']" :key="item">{{ item }}</p>
  <div v-sticky="stickyConfig">
    <nav>
      <div>
        {{ msg }}
        <pre>
          {{ stickyConfig }}
        </pre>
      </div>
    </nav>
  </div>
  <p v-for="item in fillArray">{{ item }}</p>
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
