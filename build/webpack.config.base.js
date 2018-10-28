const path = require('path');

let config = {
    target: 'web',
    entry: path.join(__dirname, '../client/main.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/, // 因为有的 node_modules 文件已经是经过 babel 处理过的, 不符合我们的 es6 或者 es7 规范, 所有剔除
                enforce: 'pre' // 预处理: 在vue-loader之前就进行检测, 在这几种文件对应的loader处理之前就进行eslint-loader的检测
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'resources/[path][name]-[hash:8].[ext]'
                    }
                }
            }
        ]
    }
};

module.exports = config;
