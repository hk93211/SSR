const path = require('path');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const VueServerPlugin = require('vue-server-renderer/server-plugin');

const isDev = process.env.NODE_ENV === 'development';

let config;

config = merge(baseConfig, {
    target: 'node',
    entry: path.join(__dirname, '../client/server-entry.js'),
    output: {
        libraryTarget: 'commonjs2',
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies),
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'less-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueServerPlugin()
    ]
});

module.exports = config;
