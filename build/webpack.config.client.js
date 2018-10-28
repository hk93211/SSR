const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

console.log(path.join(__dirname, '../src/main.js'));

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': isDev ? '"development"' : '"production"'
    }),
    new HTMLPlugin({
        template: path.join(__dirname, '../index.html')
    })
];

let config;

if (isDev) {
    config = merge(baseConfig, {
        devtool: '#@cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'less-loader'
                    ]
                }
            ]
        },
        devServer: {
            port: '4000',
            open: false,
            host: 'localhost',
            hot: true,
            overlay: {
                errors: true
            }
        },
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });
    config.plugins.push();
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/main.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: ExtractPlugin.extract({
                        fallback: 'style-loader',
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
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    });
}

module.exports = config;
