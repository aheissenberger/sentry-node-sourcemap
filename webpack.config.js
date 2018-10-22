const path = require('path');
// const SentryCliPlugin = require('@sentry/webpack-plugin');


module.exports = {
  entry: './src/mindex.js',
  mode: "production",
  target: 'node',
  node: {
    __dirname: false,
  },
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    // if mode: production - this Uglify needs to be disabled for sourcmap to create valid line numbers
    minimizer: [],
  },
  plugins: [
    // currently broken - will be called bevor creation of map file
    // new SentryCliPlugin({
    //     include: 'dist',
    //     ignoreFile: '.sentrycliignore',
    //     ignore: ['node_modules', 'webpack.config.js'],
    //     configFile: 'sentry.properties',
    //     urlPrefix: __dirname + '/dist/',
    //     //dryRun: true,
    //     debug: true,
    //     release: 'release009',
    //   })
  ]
};