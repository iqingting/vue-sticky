# vue-sticky
A directive to sticky element for vue.js(2.x).

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
