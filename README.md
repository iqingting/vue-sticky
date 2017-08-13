# vue-sticky
A directive to sticky element for vue.js(2.x).
> for useage with Vue 1.x, see the [2.x branch](https://github.com/rguanghui/vue-sticky/tree/2.x)

# Install
`npm install vue-sticky --save`

# Dev
run `npm install` and `npm run dev`

# Import
```javascript
import VueSticky from 'vue-sticky' // Es6 module

const VueSticky = VueSticky.default // Global variable
```

# Use

``` javascript
directives: {
  'sticky': VueSticky,
},
```

``` html
<ELEMENT v-sticky="{ zIndex: NUMBER, stickyTop: NUMBER }">
  <div> <!-- sticky wrapper, IMPORTANT -->
    CONTENT
  </div>
</ELEMENT>
```

## Using with Bootstrap grid

```html
<div class="row">
  <div class="col-sm-3" v-sticky> <!-- use on the column element -->
    <section class="my-menu-bar"> <!-- sticky wrapper, IMPORTANT -->
      ...
    </section>
  </div>
  <div class="col-sm-9">
    <section class="my-content">
      ...
    </section>
  </div>
</div>
```
