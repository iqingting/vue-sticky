/*eslint-env node */
module.exports = Object.assign({
  entry: './src',
  output: {
    library: 'StickyDirective',
    libraryTarget: 'umd',
    filename: 'vue-sticky.js',
    path: './dist',
  },
  externals: {
    'vue': 'Vue',
  },
}, require('./webpack.base'));
