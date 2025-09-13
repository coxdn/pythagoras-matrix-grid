var webpack = require('webpack');
var path = require('path');

const NODE_ENV = "production"

module.exports = {
    // devtool: 'source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                include: path.join(__dirname, './src'),
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/react',
                        { 'plugins': ['@babel/plugin-proposal-class-properties'] }
                    ]
                }
            },
            {
                test: /\.css$/,
                use:[
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(png|jpeg|ttf)$/,
                use: { loader: 'url-loader', options: { limit: 8192 } } 
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: NODE_ENV=="development" ? true : false
        })
    ],
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    mode: 'production'
    // optimization: {
    //     minimizer: [
    //       new UglifyJsPlugin({
    //         uglifyOptions: {
    //           output: {
    //             comments: false
    //           }
    //         }
    //       })
    //     ]
    // }
}