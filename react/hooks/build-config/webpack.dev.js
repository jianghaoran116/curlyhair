
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
    port: 8082,
  },
  devtool: 'cheap-source-map',
  optimization: {
    minimize: false,
  },
};

module.exports = merge(baseConfig, devConfig);
