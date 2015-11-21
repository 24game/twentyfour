var webpack = require("webpack");
var path = require('path');


module.exports = {
    entry: [
        './src/js/app.js',
        ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "./src/js"),
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
