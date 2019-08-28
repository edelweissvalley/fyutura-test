module.exports = {
  plugins: {
    'postcss-nested': {},
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions',
      autoprefixer: {
        remove: false,
      },
    },
    'cssnano': {},
  },
};
