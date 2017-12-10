const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const stylusLoader = require('stylus-loader');

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const postCssOptions = {
  options: {
    config: {
      ctx: {
        autoprefixer: {
          browsers: ['last 4 version'],
        }
      }
    }
  }
}

module.exports = {
  entry: {
    index: './frontend/index.js',
    about: './frontend/about.js',
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: NODE_ENV === 'production' ? 
        ExtractTextPlugin.extract([ 'css-loader?minimize&-autoprefixer', { loader: 'postcss-loader', options: postCssOptions } ]) :
        [ 'style-loader', 'css-loader?minimize&-autoprefixer', { loader: 'postcss-loader', options: postCssOptions }] 
      },
      {
        test: /\.styl$/,
        use: NODE_ENV === 'production' ? 
        ExtractTextPlugin.extract([ 'css-loader?minimize&-autoprefixer', { loader: 'postcss-loader', options: postCssOptions }, 'stylus-loader']) :
        [ 'style-loader', 'css-loader?minimize&-autoprefixer', { loader: 'postcss-loader', options: postCssOptions }, 'stylus-loader'] 
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.pug$/,
        use:  ['html-loader', 'pug-html-loader']
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['docs']),
    new ExtractTextPlugin("styles.css"),
    new stylusLoader.OptionsPlugin({
      default: {
        import: ['~stylus-mixins/index.styl'],
      },
    }),
    new HtmlWebpackPlugin({
      template: '!!pug-loader!frontend/pages/home/tpl.pug',
      title: 'Home',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: '!!pug-loader!frontend/pages/about/tpl.pug',
      title: 'About',
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      template: '!!pug-loader!frontend/pages/contacts/tpl.pug',
      title: 'Contacts',
      filename: 'contacts.html'
    }),
  ],
};
