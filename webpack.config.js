const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const paths = require("./paths.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");
const PAGES_DIR = paths.appPublic
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".html"));
const isProduction = process.env.NODE_ENV === "production";
const plugins = [
  new CleanWebpackPlugin(),
  ...PAGES.map(
    (page) =>
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `./${page}`,
      })
  ),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: isProduction ? "styles/[name].[hash].css" : "styles/[name].css",
    chunkFilename: isProduction
      ? "styles/[name].[chunkhash].css"
      : "styles/[id].[name].css",
  }),
];

module.exports = {
  entry: "./src/index.ts",
  target: "web",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        // For pure CSS - /\.css$/i,
        // For Sass/SCSS - /\.((c|sa|sc)ss)$/i,
        // For Less - /\.((c|le)ss)$/i,
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: !isProduction,
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "url-loader",
        options: {
          limit: 8192,
            outputPath: "img",
            publicPath: "public/img",
            name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: paths.appBuild,
  },
  plugins,
};
