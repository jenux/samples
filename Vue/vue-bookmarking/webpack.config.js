var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
          test: /\.vue$/,
          loader: 'vue'
      },
      {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
          }
      }
    ]
  },

  plugins: [
    new webpack.ExternalsPlugin('commonjs', [
      'electron'
    ]),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    compress: true,
    port: 9001,
    historyApiFallback: true,
    inline: true,
    progress: true,
    color: true
  }
}
