const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['lodash', 'mobx'] // 手动指定打包哪些库
  },
  output: {
    filename: '[name].[hash:8].dll.js',
    path: path.resolve(__dirname, './dll'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, './dll/[name].manifest.json'), // 生成对应的manifest.json，给webpack打包用
      name: '[name]',
    }),
  ],
}