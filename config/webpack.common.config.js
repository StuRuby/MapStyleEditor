const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: __dirname,
    entry: '../src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'kmap-style-editor-[name].js'
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ],
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                ]
            },
            {
                test: /\.(png|gif|jpe?g|svg|xml|json|ttf|woff|eot)$/,
                use: ['url-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '../public/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
}