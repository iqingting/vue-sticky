<script>
import VueSticky from '../src/index.js'

export default {
  name: 'App',
  data() {
    return {
      fillArray: Array(100).fill().map((item, index) => item = index),
      loading: true,
      stickyConfig: {
        zIndex: 100,
        stickyTop: 100
      },
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)

    setTimeout(() => {
      this.stickyConfig.stickyTop = 300
    }, 5000)
  },
  directives: {
    'sticky': VueSticky,
  },
}
</script>

<template>
<div>
  <p v-for="item in ['before', 'sticky', 'enabled']">{{ item }}</p>
  <div v-sticky="stickyConfig">
    <nav>
      <div v-if="!loading">to be sticky</div>
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
    line-height: 3;
    box-shadow: 0 8px 20px 0 rgba(0,0,0,.2);
  }
</style>
