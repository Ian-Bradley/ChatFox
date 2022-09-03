const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: path.join(path.dirname(__dirname), 'src', 'index.jsx'),
    output: {
        path: path.join(path.dirname(__dirname), 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(path.dirname(__dirname), 'src', 'index.html'),
            favicon: path.join(path.dirname(__dirname), 'src/assets/icons', 'favicon-32.png'),
        }),
    ],
    resolve: {
        alias: {
            Src: path.join(path.dirname(__dirname), 'src'),
            Assets: path.join(path.dirname(__dirname), 'src', 'assets'),
            Redux: path.join(path.dirname(__dirname), 'src', 'redux'),
            Common: path.join(path.dirname(__dirname), 'src', 'common'),
            Styles: path.join(path.dirname(__dirname), 'src', 'styles'),
            Util: path.join(path.dirname(__dirname), 'src', 'util'),
            Views: path.join(path.dirname(__dirname), 'src', 'views'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(css|scss)$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
