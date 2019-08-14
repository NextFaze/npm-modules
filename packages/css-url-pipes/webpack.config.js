const Config = require('webpack-config').Config;
const path = require('path');

module.exports = new Config()
  .extend('../../common/angular-webpack.config.js')
  .merge({
    entry: {
      'nextfaze-css-url-pipes.umd': './src/index.ts',
      'nextfaze-css-url-pipes.umd.min': './src/index.ts'
    },
    output: {
      path: path.join(__dirname, 'dist')
    }
  });
