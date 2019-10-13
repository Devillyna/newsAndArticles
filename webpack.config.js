const path = require('path');

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  devtool: 'inline-source-app',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
