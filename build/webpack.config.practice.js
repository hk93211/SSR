const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': '"development"'
    }),
    new HTMLPlugin({
        template: path.join(__dirname, '../index.html')
    })
];

let config;

config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
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
        port: '8080',
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
    ]),
    resolve: {
        alias: {
            // import Vue from 'vue';  这个vue是这里指定的, 默认是引入的是 vue.runtime.xxx.js, 开发环境为 vue.runtime.esm.js, 正式环境为 vue.runtime.min.js, 这里要使用vue.esm.js, 否则会报错: [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
            'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
        }
    }
});

module.exports = config;
