//webpack.config.js
const path = require('path');

const nodeConfig = {
  target: 'node',
  mode: "development",
  devtool: "inline-source-map",
  entry: "./lib/node/velox.node.ts",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "velox-bundle.node.js",
    library: {
      name: "Velox",
      type: "umd"
    },
    globalObject: 'this'
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
}

const webConfig = {
  target: 'web',
  mode: "development",
  devtool: "inline-source-map",
  entry: "./lib/web/velox.ts",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "velox-bundle.js",
    library: {
      name: "Velox",
      type: "umd"
    },
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
}

module.exports = [nodeConfig, webConfig]