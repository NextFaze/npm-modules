const Config = require('webpack-config').Config;
const path = require('path');

module.exports = new Config()
  .extend('../../common/angular-webpack.config.js')
  .merge({
    entry: {
      'nextfaze-loopback-query.umd': './src/index.ts',
      'nextfaze-loopback-query.umd.min': './src/index.ts',
    },
    output: {
      path: path.join(__dirname, 'dist'),
    },
  });
