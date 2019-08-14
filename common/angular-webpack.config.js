const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const angularExternals = require('webpack-angular-externals');
const rxjsExternals = require('webpack-rxjs-externals');

const pkg = JSON.parse(fs.readFileSync('./package.json').toString());

const BannerPlugin = new webpack.BannerPlugin({
  banner: `
/**
* ${pkg.name} - ${pkg.description}
* @version v${pkg.version}
* @author ${pkg.author.name}
* @link ${pkg.homepage}
* @license ${pkg.license}
*/
  `.trim(),
  raw: true,
  entryOnly: true,
});

module.exports = {
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'nextfaze',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  mode: 'production',
  optimization: {
    minimize: true
  },
  externals: [angularExternals(), rxjsExternals()],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.json',
            },
          },
          {
            loader: 'angular2-template-loader',
          },
        ],
        exclude: [/node_modules/, /\.(spec|e2e)\.ts$/],
      },

      {
        test: /\.json$/,
        use: 'json-loader',
      },

      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
      },

      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.html$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(__dirname, 'src'),
    ),
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      path.join(__dirname, 'src'),
    ), BannerPlugin
  ],
};