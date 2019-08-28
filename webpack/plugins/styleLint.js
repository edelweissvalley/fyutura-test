const StyleLintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

module.exports = (dirName) => ({
  plugins: [
    new StyleLintPlugin({
      configFile: path.resolve(dirName, '.stylelintrc.json'),
      files: './src/**/*.pcss',
      quiet: false,
    }),
  ],
});
