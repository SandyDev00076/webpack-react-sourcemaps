const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  return {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
      port: 3010,
    },
    devtool: env.ENABLE_SOURCE_MAPS ? "source-map" : false,
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
    ],
  };
};
