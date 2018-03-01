const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = require('./webpack.shared.config')({
  entry: {
    styles: path.join(process.cwd(), 'client/styles.js'),
    // 'styles.min': path.join(process.cwd(), 'client/styles.js'),
    index: ["babel-polyfill", path.join(process.cwd(), 'client/index.js')],
    // 'index.min': path.join(process.cwd(), 'client/index.js'),
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      test: [/\.js$/],
      // filename: "app.js.map",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),

    // new HtmlWebpackPlugin({
    //   template: 'client/index.html',
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: false,
    //   },
    //   inject: true,
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })

    // new UglifyJsPlugin()
    // new BundleAnalyzerPlugin()
  ]
});
