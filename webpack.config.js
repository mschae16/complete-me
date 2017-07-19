const path = require('path');

module.exports = {
  entry: {
    main: "./scripts/index.js"

  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/ },
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.css']
  }
};
