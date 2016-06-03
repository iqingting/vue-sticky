<script>
import VueSticky from '../src/index.js'

export default {
  data() {
    return {
      fillArray: Array(100).fill().map((item, index) => item = index),
    };
  },
  directives: {
    'sticky': VueSticky,
  },
};
</script>

<template>
  <p v-for="item in ['before', 'sticky', 'enabled']">{{item}}</p>
  <nav v-sticky :z-index="100" :sticky-top="50"><div>to be sticky</div></nav>
  <p v-for="item in fillArray">{{item}}</p>
</template>

<style>
  body {
    margin: 0;
  }
  div {
    line-height: 200px;
    font-size: 100px;
    background-color: #eee;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
</style>
