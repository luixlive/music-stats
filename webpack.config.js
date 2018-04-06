const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    'whatwg-fetch',
    path.resolve(__dirname, './src/app/index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'index_bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }]
    }, {
      test: /\.(eot|png|ttf|svg|woff|woff2)$/,
      use: 'file-loader'
    }, {
      test: /\.less$/,
      use: [{
          loader: "style-loader"
      }, {
          loader: "css-loader"
      }, {
          loader: "less-loader"
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: './src/app/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    ...(process.env.NODE_ENV !== 'production' ? [
      new webpack.HotModuleReplacementPlugin()
    ] : []),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    // Hack to solve Semantic UI issue reading theme.config
    alias: {
      '../../theme.config$': path.join(__dirname, 'src/app/style/theme.config')
    },
    extensions: [".js", ".jsx"]
  }
};
