const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

console.log(path.join(__dirname, '../client/main.js'));

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
                        'vue-style-loader',
                        // 'css-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true, // 启用 css 模块, 注意: 如果设置为true, 所有样式文件的import 都要使用css-modules的这种形式来写
                                localIdentName: isDev ? '[path][name]-[hash:base64:5]' : '[hash:base64:5]', // 配置生成的标识符, dev 环境使用文件的全路径, 好查类名所在文件
                                camelCase: true // 以驼峰化式命名导出类名
                            }
                        },
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
            app: path.join(__dirname, '../client/main.js'),
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
                        fallback: 'vue-style-loader',
                        use: [
                            // 以前的vue-loader的配置转换到css-loader里面来配置了
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true, // 启用 css 模块, 注意: 如果设置为true, 所有样式文件的import 都要使用css-modules的这种形式来写
                                    localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // 配置生成的标识符, dev 环境使用文件的全路径, 好查类名所在文件
                                    camelCase: true // 以驼峰化式命名导出类名
                                }
                            },
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
