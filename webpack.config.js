//webpack.config.js
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./lib/velox.ts",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "velox-bundle.js",
    library: {
      name: "Velox",
      type: "umd"
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};