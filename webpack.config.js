var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './Src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'WebRoot'),
        // publicPath: "/WebRoot/"
    },
    devServer: {contentBase: "./WebRoot", port: 80},
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader'}
        ]
    },
    // plugins: [new HtmlWebpackPlugin()],
    devtool: "source-map"
};