const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = (env, argv) => {
  return {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
      port: 3010,
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /.s[ac]ss$/,
          exclude: /.module.s[ac]ss/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /.module.s[ac]ss/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "..", "./build"),
      filename: "output.js",
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "..", "./public/index.html"),
      }),
      argv.mode === "production"
        ? new SourceMapDevToolPlugin({
            // this is the url of our local sourcemap server
            publicPath: "http://localhost:5050/",
            filename: "[file].map",
          })
        : new SourceMapDevToolPlugin({}),
    ],
  };
};
