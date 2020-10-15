const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const APP_DIR = path.resolve(__dirname, "src");
const paths = require("./paths.js");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PAGES_DIR = paths.appPublic;
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith('.html'))
const host = process.env.HOST || '127.0.0.1';
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT;
const isProduction = process.env.NODE_ENV === 'production';  
const plugins = [
  ...PAGES.map(
    page =>
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `./${page}`
      })
  ),
  // new CopyWebpackPlugin({
  //   patterns: [
  //     // Images:
  //     {
  //       from: `${paths.appPublic}/assets/img`,
  //       to: `${paths.appBuild}/assets/img`
  //     },
  //     // Fonts:
  //     {
  //       from: `${paths.appPublic}/assets/fonts`,
  //       to: `${paths.appBuild}/assets/fonts`
  //     },
  //     // Static (copy to '/'):
  //     {
  //       from: `${paths.appPublic}assets/static`,
  //       to: `${paths.appBuild}/static`
  //     }
  //   ]
  // }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: isProduction
      ? "styles/[name].[hash].css"
      : "styles/[name].css",
    chunkFilename: isProduction
      ? "styles/[name].[chunkhash].css"
      : "styles/[id].[name].css"
  }),
  new webpack.HotModuleReplacementPlugin(),
];
// only enable hot in development
module.exports = {
  entry: ["webpack/hot/dev-server", paths.appSrc + "/index.ts"],
  devtool: "inline-source-map",
  target: "web",
  mode: "development",
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
          isProduction ?  MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { 
              sourceMap: !isProduction,  
              // url: true,
              // localIdentName: '[local]__[hash:base64:6]',
              importLoaders: 1,
              // minimize: true
            }
          },
          // {
          //   loader: 'sass-loader',
          //   options: { sourceMap: !isProduction }
          // },
          {
            loader: 'postcss-loader',
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  devServer: {
    contentBase: paths.appPublic,
    port: 3000,
    disableHostCheck: true,
    compress: true,
    host,
    sockHost,
    sockPath,
    sockPort,
    hot: true,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins,
};
