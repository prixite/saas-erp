/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require("path");

module.exports = {
  mode: "development",
  entry: "/frontend/src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist/"),
    filename: "main.js",
  },
};
