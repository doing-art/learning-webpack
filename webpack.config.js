const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const config = {
  context: path.resolve(__dirname, "src"),
  mode: process.env.NODE_ENV,
  devtool: isDev ? "source-map" : undefined,
  entry: {
    main: "./index.js",
    analytics: "./analytics.ts"
  },
  output: {
    filename: "[name].js?[fullhash]",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  optimization: {
    // splitChunks: {
    //   chunks: "all"
    // },
    runtimeChunk: "single",
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      inject: "body"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "favicon.png"),
          to: path.resolve(__dirname, "dist"),
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css?[fullhash]"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        type: "asset",
        generator: {
          filename: "images/[hash][ext][query]"
        }
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]"
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 4200,
    hot: isDev,
  }
};

if (isProd) {
  config.plugins.push(new CleanWebpackPlugin());
}


module.exports = config;
