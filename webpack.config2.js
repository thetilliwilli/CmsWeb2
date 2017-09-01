var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './WebRootAuth/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'WebRootAuth'),
        // publicPath: "/WebRoot/"
    },
    devServer: {contentBase: "./WebRootAuth", port: 80, historyApiFallback: true},
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader'}
        ]
    },
    // plugins: [new HtmlWebpackPlugin()],
    // devtool: "source-map"
};