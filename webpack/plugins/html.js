const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (pathToSource) => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: `${pathToSource}/index.html`,
    }),
  ],
});
