/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require("path");

module.exports = {
  mode: "development",
  entry: "/frontend/src/index.tsx",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "../src/"),
    },
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "../dist/"),
    filename: "main.js",
  },
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
