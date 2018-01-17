# VueSticky

[![npm](https://img.shields.io/npm/v/vue-sticky.svg)](https://www.npmjs.com/package/vue-sticky) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Sticky element

> for useage with Vue 1.x, see the [2.x branch](https://github.com/rguanghui/vue-sticky/tree/2.x)

## Installation

```bash
npm install --save vue-sticky
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import VueSticky from 'vue-sticky'

Vue.use(VueSticky)
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<link rel="stylesheet" 
<script src="vue-sticky/dist/vue-sticky.js"></script>

<!-- From CDN -->
<script src="https://unpkg.com/vue-sticky"></script>
```


### Example

```html

<nav v-sticky>
  content
</nav>

```

or 

```html

<nav v-sticky="{ top: 15, zIndex: 0 }">
  content
</nav>

```


## Development

### Launch visual tests

```bash
npm run dev
```

### Launch Karma with coverage

```bash
npm run dev:coverage
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```

## License

[MIT](http://opensource.org/licenses/MIT)
