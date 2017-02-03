var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  entry: {
    app: SRC_PATH+'/app/app.ts',
    mobile: SRC_PATH+'/mobile/mobile.ts',
    vendors: ['jquery', 'moment', 'lodash']
  },
  output: {
    path: DIST_PATH,
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Webpack Web',
      template: SRC_PATH+'/app/app.html',
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'Webpack Mobile',
      template: SRC_PATH+'/mobile/mobile.html',
      filename: 'mobile.html',
      chunks: ['mobile', 'vendors'],
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { 
        test: /\.ts$/, 
        loader: 'ts-loader' 
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: SRC_PATH
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    port: 9000,
    historyApiFallback: true,
    inline: true,
    progress: true,
    color: true
  }
};
