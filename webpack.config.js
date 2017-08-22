var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './Src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'WebRoot')
    },
    // devServer: { contentBase: "./WebRoot" },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.jsx$/, loader: 'babel-loader' }
        ]
    },
    // plugins: [new HtmlWebpackPlugin()],
    // devtool: 'cheap-module-source-map'
};