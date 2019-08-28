// process.traceDeprecation = true;
const path = require('path');
const merge = require('webpack-merge');

const postCss = require('./webpack/rules/postcss');
const extractCSS = require('./webpack/rules/css.extract');
const typescript = require('./webpack/rules/typescript');
const files = require('./webpack/rules/files');
const miniCssExtract = require('./webpack/plugins/miniCssExtract');
const uglifyJS = require('./webpack/plugins/uglify');
const clean = require('./webpack/plugins/clean');
const html = require('./webpack/plugins/html');
const styleLint = require('./webpack/plugins/styleLint');
const hotModuleReplacement = require('./webpack/plugins/hotModuleReplacement');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const common = ({mode = 'development'}) => (merge([
  {
    entry: {
      index: [
        'normalize.css',
        `${PATHS.source}/common.css`,
        `${PATHS.source}/index.tsx`,
      ],
    },
    output: {
      path: PATHS.build,
      filename: '[hash].js',
      publicPath: '/',
    },
    resolve: {
      alias: {
        'src': PATHS.source,  
        'components': `${PATHS.source}/components`,
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    stats: {
      assets: false,
      modules: false,
    },
    mode,
  },
  html(PATHS.source),
  files,
  typescript({mode}),
]));

module.exports = (mode) => {
  switch (mode) {
    case 'development':
      return merge([
        {
          watch: true,
          devServer: {
            hot: true,
          },
        },
        common({mode}),
        hotModuleReplacement,
        postCss,
        styleLint(__dirname),
      ]);

    case 'production':
      return merge([
        common({mode}),
        extractCSS,
        miniCssExtract,
        uglifyJS,
        clean(PATHS.build),
      ]);
  }
};
