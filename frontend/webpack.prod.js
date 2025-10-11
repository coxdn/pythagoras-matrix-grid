const webpack = require('webpack');
const path = require('path');
const babelOptionalChaining = require.resolve('@babel/plugin-transform-optional-chaining');
const babelNullish = require.resolve('@babel/plugin-transform-nullish-coalescing-operator');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'node_modules/react-grid-layout'),
          path.resolve(__dirname, 'node_modules/react-draggable'),
          path.resolve(__dirname, 'node_modules/react-resizable'),
          path.resolve(__dirname, 'node_modules/fast-equals'),
          path.resolve(__dirname, 'node_modules/react-select-search'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            cacheDirectory: true,
            presets: [
              ['@babel/preset-env', { targets: { ie: '11' } }],
            ],
            plugins: [
              babelOptionalChaining,
              babelNullish,
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(png|jpe?g|ttf)$/,
        type: 'javascript/auto',
        use: { loader: 'url-loader', options: { limit: 8192 } },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(false),
    }),
  ],
  performance: {
    hints: 'warning',
  },
};
