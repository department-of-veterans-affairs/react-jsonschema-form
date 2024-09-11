var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "eval",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    "./playground/app"
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  infrastructureLogging: {
    level: "warn"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "playground"),
          path.join(__dirname, "node_modules", "codemirror", "mode", "javascript"),
        ]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
        include: [
          path.join(__dirname, "css"),
          path.join(__dirname, "playground"),
          path.join(__dirname, "node_modules"),
        ],
      }
    ]
  }
};
