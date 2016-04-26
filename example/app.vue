<script>
import stickyDirective from '../src/index.js'

export default {
  data() {
    return {}
  },
  directives: {
    'sticky': stickyDirective,
  },
};
</script>

<template>
  <div v-sticky :z-index="100">to be sticky</div>
  <!-- <div v-sticky :sticky-top="50">to be sticky</div> -->
</template>

<style>
  body {
    margin: 0;
    height: 10000px;
    padding-top: 100px;
  }
  div {
    line-height: 200px;
    font-size: 100px;
    background-color: #eee;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
</style>
