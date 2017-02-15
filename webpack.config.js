var path = require('path')
var webpack = require('webpack')
var isProd = process.env.NODE_ENV === 'production'
var isDev = !isProd
var root = function(dir){ return path.resolve(__dirname, dir) }

var plugins = isDev ? [
    new webpack.HotModuleReplacementPlugin()
] : [
    new webpack.optimize.UglifyJsPlugin()
]

module.exports = {
    externals: {
        'react/addons': true, // Do not include these externals in the bundle
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    devtool: 'source-map', // Allow Source Map to Debug
    entry: root('components/index.jsx'),
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.jsx$/,
            loaders: ['babel-loader'],
            exclude: '/(node_modules|spec/.js$)/'
        },
        {
            test: /\.jsx$/,
            enforce: 'pre',
            exclude: /(node_modules|\.spec\.js)/,
            use: [
                {
                    loader: 'eslint-loader',
                    options: {
                        failOnWarning: false,
                        failOnError: false,
                        emitWarning: true
                    }
                }
            ]
        }]
    },
    output: {
        path: root('public/js'),
        publicPath: root('public/js'),
        filename: 'bundle.js'
    }
}
