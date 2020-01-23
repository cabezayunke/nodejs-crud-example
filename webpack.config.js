const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  target: 'node',
  context: __dirname,
  node: {
    __filename: false,
    __dirname: false,
  },
  // Generate source maps for proper error messages
  devtool: 'source-map',
  // exclude all node dependencies
  //externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.js/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader'
      }]
    }]
  },
  plugins: [],
};
