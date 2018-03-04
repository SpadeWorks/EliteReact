const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = require('./webpack.shared.config')({
  entry: {
    styles: path.join(process.cwd(), 'client/styles.js'),
    // 'styles.min': path.join(process.cwd(), 'client/styles.js'),
    index: [path.join(process.cwd(), "client/polyfill.ts"), path.join(process.cwd(), 'client/index.js')],
    // 'index.min': path.join(process.cwd(), 'client/index.js'),
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),

    new CompressionPlugin({
      test: /\.js/
    }),
    new BundleAnalyzerPlugin()
  ]
});
