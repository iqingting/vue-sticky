/*eslint-env node */
module.exports = Object.assign({
  entry: './example',
  output: {
    filename: 'build.js',
    path: __dirname,
    publicPath: '/',
  },
  devServer: {
    port: 3000,
  },
}, require('./webpack.base'));
