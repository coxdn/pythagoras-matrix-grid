var path = require('path')

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    "module": {
        "rules": [
            {
                test: /\.js/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                // options: {
                //     presets: [
                //         '@babel/preset-env',
                //         '@babel/react',
                //         { 'plugins': ['babel/plugin-proposal-class-properties'] }
                //     ]
                // },
                
                // query: {
                //     cacheDirectory: true,
                //     plugins: [
                //       ['react-transform',
                //         {
                //           transforms: [
                //             {
                //               transform: 'react-transform-hmr',
                //               imports: ['react'],
                //               locals: ['module']
                //             }
                //           ]
                //         }
                //       ]
                //     ]
                // }
            },
            {
                test: /\.css/,
                use:[
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    },
    "mode": "development"
}