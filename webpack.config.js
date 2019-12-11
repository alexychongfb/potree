const path = require('path');
var TerserPlugin = require('terser-webpack-plugin')


function resolve(name) {
  return path.resolve(__dirname, name);
}

module.exports = {
  mode: 'development',
  entry: "./src/Potree.js",
  module: {
    rules: [
      {
        test: /Worker\.js$/,
        loader: 'worker-loader',
        options: { inline: true, fallback : false},
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: '[name].map',
    library: 'Potree',
    libraryTarget: 'commonjs',
  },
  devtool: 'inline-source-map',
  plugins: [
    //new PeerDepsExternalsPlugin(),
  ],
};
