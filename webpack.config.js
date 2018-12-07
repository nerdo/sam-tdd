const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    react: './src/react.js',
    'lit-html': './src/lit-html.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: '[name]/[name]-app.js'
  }
};
