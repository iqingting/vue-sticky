/*eslint-env node */

module.exports = {
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, loader: 'buble-loader' },
    ],
  },
  devtool: 'cheap-eval-source-map',
}
