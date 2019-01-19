const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
        index: '../src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/editor-[name].js'
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [path.resolve(__dirname, '../node_modules')],
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: [path.resolve(__dirname, '../node_modules')],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: [path.resolve(__dirname, '../node_modules')],
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|gif|jpe?g|svg|xml|json|ttf|woff|eot)$/,
                use: ['url-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.ico$/,
                use: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(svg|gif|jpg|png)$/,
                use: 'file-loader?name=img/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '../public/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../assets/svg/logo-color.svg'),
                to: path.resolve(__dirname, '../dist/logo-color.svg')
            }
        ]),
        new webpack.ProvidePlugin({
            ReactDOM: 'react-dom',
            MapboxGl: 'mapbox-gl',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk:true
    }
};
