module.exports = ({env}) => ({
    module: {
      rules: [
        {
          test: /\.(tsx|ts)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/react',
                  '@babel/preset-typescript',
                  [
                    "@babel/preset-env",
                    {
                      "loose": true,
                    }
                  ]
                ],
                plugins: [
                  ...((env === 'development') ? ['react-hot-loader/babel'] : []),
                  '@babel/plugin-proposal-object-rest-spread',
                  '@babel/plugin-proposal-class-properties',
                ],
              },
            },
            {
              loader: 'tslint-loader',
              options: {
                configFile: 'tslint.json',
                tsConfigFile: 'tsconfig.json',
                typeCheck: true,
              },
            }
          ],
        },
      ],
    },
  }
);
