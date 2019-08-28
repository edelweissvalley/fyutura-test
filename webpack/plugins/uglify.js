const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      extractComments: true,
    })
  ]
};
