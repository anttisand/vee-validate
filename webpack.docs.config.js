const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.join(__dirname, 'docs', 'main'),
    },
    output: {
        path: path.join(__dirname, 'gh-pages', 'assets'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: './gh-pages',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /.scss$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'sass'])
            },
            {
                test: /\.woff(2)?(\?.*)?$/i,
                loader: 'url',
                query: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('css'),
            sass: ExtractTextPlugin.extract('style', ['css', 'sass'])
        },
        plugins: [
            new ExtractTextPlugin('[name].css')
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};