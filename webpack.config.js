const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

let config = {
    target: 'web',
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
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
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]-[hash:8].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': isDev ? '"development"' : '"production"'
        }),
        new HTMLPlugin({
            template: path.join(__dirname, 'index.html')
        })
    ]
};
if (isDev) {
    config.module.rules.push({
        test: /\.less/,
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
    });
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: '4000',
        open: true,
        host: 'localhost',
        hot: true,
        overlay: {
            errors: true
        }
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
} else {
    config.entry = {
        app: path.join(__dirname, 'src/main.js'),
        vendor: ['vue']
    };
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push({
        test: /\.less/,
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
    });
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        //
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    );
}

module.exports = config;
