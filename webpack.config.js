var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './Client/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'WebRoot'),
        // publicPath: "/WebRoot/"
    },
    devServer: {contentBase: "./WebRoot", port: 80, historyApiFallback: true},
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader'/* , options: {"plugins": ["transform-object-rest-spread"], presets:["es2015","react","camo"]} */}
        ]
    },
    // plugins: [new HtmlWebpackPlugin()],
    // devtool: "source-map"
};