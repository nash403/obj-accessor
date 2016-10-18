var webpack = require('webpack');

module.exports = {
  entry: "./index",
  output: {
    path: __dirname,
    filename: "./browser-version/set-safe.js",
    library: "setSafe",
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ["",".js"]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/], // exclude unwanted js files
      loader: 'babel' // 'babel-loader' is also valid name
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin() // Plugin for js minification
  ]
}
