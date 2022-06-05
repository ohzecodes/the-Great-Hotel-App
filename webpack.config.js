const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "./js/",
    filename: "bundle.js",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      hash: false,
      template: "./public/index.ejs",
      publicPath: "./js",
      // publicPath defines what will append in html while calling
      filename: "../index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      { test: /\.(png|jpg)$/, use: "url-loader?limit=8192" },
    ],
  },
};
