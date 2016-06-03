<script>
import VueSticky from '../src/index.js'

export default {
  data() {
    return {
      fillArray: Array(100).fill().map((item, index) => index),
    };
  },
  directives: {
    'sticky': VueSticky,
  },
};
</script>

<template>
  <p v-for="item in ['before', 'sticky', 'enabled']">{{item}}</p>
  <nav v-sticky :z-index="100">to be sticky</nav>
  <p v-for="item in fillArray">{{item}}</p>
</template>

<style>
  body {
    margin: 0;
  }
  nav {
    line-height: 200px;
    font-size: 100px;
    background-color: #eee;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
</style>
