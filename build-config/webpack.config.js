const path = require('path');
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

'use strict';
module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/entryPoints/index.jsx',
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: "[name]/[name].js",
  },
  module: {
    rules: require("./rules.config"),
  },
  devServer: {
    open: true,
    historyApiFallback: true,
    hot: true,
    port: 5000,
    proxy: {
      '/api': {
        'target': 'http://localhost:6060'
      }
    }
  },
  resolve: {
    extensions: ['.css', '.js', '.jsx', '.scss', '.json', '.png', '.jpeg', '.gif', '.svg', '.ico'],
    alias: require("./aliases.config"),
  },
  plugins: [new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }),
  new HtmlWebpackPlugin({
    template: './html/index.html',
    filename: './index.html'
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[name].css"
  }),
  ],
}