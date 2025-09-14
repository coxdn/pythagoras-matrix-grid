const webpack = require('webpack');
const path = require('path');
const babelOptionalChaining = require.resolve('@babel/plugin-transform-optional-chaining')
const babelNullish = require.resolve('@babel/plugin-transform-nullish-coalescing-operator')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const mode = process.env.NODE_ENV || 'development'
const production = mode === 'production'

module.exports = {
  mode,
  devtool     : production ? false : 'source-map',
  entry       : {
    app: [
      'react-hot-loader/patch',
      './src/index.js'
    ]
  },
  output      : {
    path      : path.join(__dirname, 'build'),
    filename  : 'bundle.js',
    publicPath: '/static/'
  },
  devServer   : {
    host              : '0.0.0.0',
    port              : 8080,
    inline            : true,
    hot               : true,
    proxy             : {
      '/ajax.php': {
        target      : 'http://cvetok.zzz.com.ua',
        secure      : false,
        changeOrigin: true
      }
    },
    historyApiFallback: {
      index: 'app.html'
    }
  },
  "module"    : {
    "rules": [
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use    : 'eslint-loader'
      },
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
          }
        }
      },
      // Transpile modern syntax inside selected node_modules to support Webpack 4
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
              babelNullish
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use : [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpeg|ttf)$/,
        use : { loader: 'url-loader', options: { limit: 8192 } }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma     : 8,
          sourceMap: true,
          comments : false
        }
      }),
    ]
  },
  plugins     : [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(!production)
    }),
    // new HtmlWebpackPlugin({
    //       // Create index.html file
    //       cache: production,
    // }),
    new webpack.NamedModulesPlugin(),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /[^r][^u]/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.HotModuleReplacementPlugin()
  ],
  resolve     : {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias     : {
      react             : path.resolve(path.join(__dirname, './node_modules/react')),
      'react-dom'       : '@hot-loader/react-dom',
      'react-hot-loader': path.resolve(
        path.join(__dirname, './node_modules/react-hot-loader'),
      ),
      'babel-core'      : path.resolve(
        path.join(__dirname, './node_modules/@babel/core'),
      ),
    },
  },
}