const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  entry: './src/index.js',
  // 为了利于分析打包后的代码，这里选择开发模式
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
    new WebpackManifestPlugin(),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './dll/vendors.manifest.json') // 读取dll打包后的manifest.json，分析哪些代码跳过
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  }
}