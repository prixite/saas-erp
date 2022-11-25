/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  mode: "development",
  entry: "/frontend/src/index.tsx",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "../src/"),
    },
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendor",
    },
  },
  output: {
    path: path.resolve(__dirname, "../dist/"),
    publicPath: "/static/",
    filename: "[name].[contenthash].js",
    clean: true,
  },
  plugins: [
    new EnvironmentPlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      REACT_APP_GOOGLE_CLIENT_ID: "fake",
    }),
    new BundleTracker({ filename: "./webpack-stats.json" }),
  ],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s?[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
