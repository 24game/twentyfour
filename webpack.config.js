var webpack = require("webpack");
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var IS_PROD = false;

Date.prototype.timeNow = function() {
  var hours = this.getHours();
  var ampm = (hours >= 12 ? 'PM' : 'AM');
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return ((hours < 10) ? "0" : "") + hours + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds() + " " + ampm;
};


module.exports = {
  entry: [
    './src/js/app.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  //devtool: IS_PROD ? '' : 'inline-source-map',
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
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', IS_PROD ? '!css!sass' : '!css?sourceMap!sass?sourceMap')
    }]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src/styles")]
  },
  debug: !IS_PROD,
  plugins: IS_PROD ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    //new webpack.optimize.UglifyJsPlugin({
    //  sourceMap: true,
    //  compress: {
    //    sequences: false,
    //    dead_code: false,
    //    conditionals: false,
    //    booleans: false,
    //    unused: false,
    //    if_return: false,
    //    join_vars: false,
    //    drop_console: false,
    //    drop_debugger: false
    //  },
    //  mangle: false,
    //  output: {
    //    comments: false
    //  }
    //}),
    function() {
      this.plugin('watch-run', function(watching, callback) {
        console.log();
        console.log('Recompiling assets starting ' + new Date()
                .timeNow() + "...");
        callback();
      })
    },
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
      new ExtractTextPlugin("./site.css")
  ] : [
    new ExtractTextPlugin("./site.css")
  ]
};
