/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require("path");
const { EnvironmentPlugin } = require("webpack");

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
  plugins: [
    new EnvironmentPlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      REACT_APP_GOOGLE_CLIENT_ID: "fake",
      REACT_APP_LOCAL_URL: "http://localhost:8000",
      REACT_APP_BASE_URL: "http://localhost:8000",
    }),
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
