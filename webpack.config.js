const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  node: {
    __dirname: true,
  },
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
};
