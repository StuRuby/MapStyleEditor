const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonWebpackPlugin = require('./webpack.common.config');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const progressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const cleanOptions = {
    root: path.resolve(__dirname, '../dist'),
    verbose: true,
    dry: false
};

module.exports = merge(commonWebpackPlugin, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('prod')
            }
        }),
        new cleanWebpackPlugin(['*'], cleanOptions),
        new progressBarWebpackPlugin(),
        new Visualizer({
            filename: './statistics.html'
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/,
            algorithm: 'gzip',
            filename: '[path].gz[query]',
            threshold: 8192,
            minRatio: 0.8
        })
    ]
});
