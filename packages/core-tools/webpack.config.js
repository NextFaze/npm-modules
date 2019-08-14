/**
 * Adapted from angular2-webpack-starter
 */

const webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin');
const join = require('path').join;

/**
* Webpack Plugins
*/
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  entry: join(__dirname, 'src/index.ts'),

  output: {
    path: join(__dirname, 'bundles'),
    publicPath: '/',
    filename: 'core.umd.js',
    library: 'ngx-translate-core',
    libraryTarget: 'umd'
  },

  // require those dependencies but don't bundle them
  externals: [/^\@angular\//, /^rxjs\//],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [join(__dirname, 'node_modules')]
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          declaration: false
        },
        exclude: [/\.spec\.ts$/]
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        tslintLoader: {
          emitErrors: false,
          failOnHint: false
        }
      }
    }),

    // Reference: https://github.com/johnagan/clean-webpack-plugin
    // Removes the bundle folder before the build
    new CleanWebpackPlugin(['bundles'], {
      root: __dirname,
      verbose: false,
      dry: false
    })
  ]
};
