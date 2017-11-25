var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react',  "env"]
      }
     },
      {
         test: /\.(png|jpg|svg)$/i, loader: "file-loader",
        options: {
         emitFile: false
        }
      },
      { test:/\.json?$/,loader:'json-loader' }
  
    ],
   
  },
devServer: {
    historyApiFallback: true,
    contentBase: './public',
    hot:true
  },
devtool:"cheap-module-eval-source-map"

}