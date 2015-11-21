var webpack = require("webpack");
var path = require('path');
var IS_PROD = false;


module.exports = {
  entry: [
    './src/js/app.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: IS_PROD ? '' : 'inline-source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.resolve(__dirname, "./src/js"),
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
        cacheDirectory: true
      }
    }]
  },
  debug: !IS_PROD,
  plugins: IS_PROD ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      },
      output: {
        comments: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    })
  ] : [

  ]
};
