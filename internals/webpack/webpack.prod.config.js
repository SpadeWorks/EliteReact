const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = require('./webpack.shared.config')({
  entry: {
    testDrive : path.join(process.cwd(), 'client/index.js'),
    style: path.join(process.cwd(), 'client/styles.js')
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      test: [/\main.js$/],
      // filename: "app.js.map",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),

    new HtmlWebpackPlugin({
      template: 'client/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new BundleAnalyzerPlugin()
  ]
});
