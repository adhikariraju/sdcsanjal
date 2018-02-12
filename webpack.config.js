var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath:"/",
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
      { test: /\.(png|jpg|svg|css)$/i, loader: "file-loader"},
      { test:/\.json?$/,loader:'json-loader' },
      {test:/\.css$/,
         use:[{
          loader: "css-loader",
          options: {
            alias: {
              quillcss: path.resolve('./node_modules/react-quill/dist')
            }
          }
        }]
      }
  
    ],
   
  },
devServer: {
    historyApiFallback: true,
    contentBase: './public',
    hot:true
  },
devtool:"cheap-module-eval-source-map"

}