const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (pathToBuild) => ({
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: pathToBuild,
    }),
  ],
});
