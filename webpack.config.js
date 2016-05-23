const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
 
module.exports = {
  devtool: 'source-map',
  debug: true,
  entry: {
    'vendor': './client/vendor.ts',
    'app': './client/bootstrap.ts'
  },
  output: {
    filename: 'bundle.js',
    path: './app/assets/javascripts/generated'
  },
  resolve: {
    root: [path.join(__dirname, 'client/assets/scripts')],
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts?$/, exclude: /node_modules/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common', filename: 'common.js', minChunks: 2, chunks: ['app', 'vendor'] })
  ]
}
