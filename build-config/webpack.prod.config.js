const path = require('path');
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

'use strict';
module.exports = {
    mode: 'production',
    entry: {
        index: './src/entryPoints/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: "[name]/[name].js"
    },
    module: {
        rules: require("./rules.config"),
    },
    resolve: {
        extensions: ['.css', '.js', '.jsx', '.json', '.png', '.jpeg', '.gif', '.svg', '.ico'],
        alias: require("./aliases.config"),
    },
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|css)$/i,
    }),
    new HtmlWebpackPlugin({
        template: './html/index.html',
        filename: './index.html'
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].css"
    })
    ]
}