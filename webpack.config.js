var path = require('path')
var webpack = require('webpack')
var isProd = process.env.NODE_ENV === 'production'

var root = function (dir) { return path.resolve(__dirname, dir) }

var plugins = isProd && [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
]

module.exports = {
    externals: {
        'react/addons': true, // Do not include these externals in the bundle
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    devtool: isProd ? 'cheap-module-source-map' : 'source-map', // Allow Source Map to Debug
    entry: root('components/index.jsx'),
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            exclude: '/(node_modules|spec/.js$)/'
        },
        {
            test: /\.jsx?$/,
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
