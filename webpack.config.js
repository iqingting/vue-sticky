/*eslint-env node */
const path = require('path')

module.exports = Object.assign({
  entry: './src',
  output: {
    library: 'VueSticky',
    libraryTarget: 'umd',
    filename: 'vue-sticky.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    'vue': 'Vue',
  },
}, require('./webpack.base'))
