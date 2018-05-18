const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, loader: 'buble-loader', options: { objectAssign: 'Object.assign' } },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
}
