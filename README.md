# vue-sticky
A directive to sticky element for vue.js.

# Install
`npm install vue-sticky --save`

# Import
```javascript
import VueSticky  from 'vue-sticky'; // Es6 module

const VueSticky = VueSticky.default; // Global variable
```

# Use
```
...
directives: {
  'sticky': VueSticky,
},
...

...
<ELEMENT v-sticky
  :z-index="NUMBER"
  :sticky-top="NUMBER"
  :holder-height="NUMBER || CSS_LENGTH">

  <div> <!-- sticky wrapper, IMPORTANT -->
    CONTENT
  </div>
</ELEMENT>
...
```
