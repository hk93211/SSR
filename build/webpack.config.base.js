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
