const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common.config');

module.exports = merge(commonWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        port: 3000,
        noInfo: false,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            }
        }),
    ]
})