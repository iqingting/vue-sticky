/*eslint-env node */
module.exports = Object.assign({
  entry: './example',
  output: {
    filename: 'build.js',
    path: __dirname,
    publicPath: '/',
  },
}, require('./webpack.base'));
