const webpack = require('webpack');
const path = require('path');
const babelOptionalChaining = require.resolve('@babel/plugin-transform-optional-chaining');
const babelNullish = require.resolve('@babel/plugin-transform-nullish-coalescing-operator');

const mode = process.env.NODE_ENV || 'development';
const production = mode === 'production';
const backendPort = process.env.BACKEND_PORT || 3000;
const apiHost = production ? 'http://example.com' : '';

module.exports = {
  mode,
  devtool: production ? false : 'source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.js',
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    proxy: {
      '/ajax': {
        target: `http://localhost:${backendPort}`,
        secure: false,
        changeOrigin: true,
      },
    },
    historyApiFallback: {
      index: '/app.html',
    },
    static: [
      {
        directory: path.resolve(__dirname),
        publicPath: '/',
        watch: false,
      },
    ],
    devMiddleware: {
      publicPath: '/static/',
    },
  },
  module: {
    rules: [
      // Transpile project sources (JSX/ES2015+) from ./src via Babel
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
            // presets/plugins are taken from .babelrc
          },
        },
      },
      // Transpile modern syntax inside selected node_modules to ensure compatibility
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
              ['@babel/preset-env', { targets: { ie: '11' } }]
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
      __DEV__: JSON.stringify(!production),
      API_HOST: JSON.stringify(apiHost),
    }),
    new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      react: path.resolve(path.join(__dirname, './node_modules/react')),
      'react-dom': '@hot-loader/react-dom',
      'react-hot-loader': path.resolve(
        path.join(__dirname, './node_modules/react-hot-loader'),
      ),
      'babel-core': path.resolve(
        path.join(__dirname, './node_modules/@babel/core'),
      ),
    },
  },
};
