import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import svgToMiniDataURI from "mini-svg-data-uri";
import { InjectManifest } from "workbox-webpack-plugin";

/* //! THIS WILL CHANGE ALL FILES AND CACHE THRASH THE APP */
const PROJECT_BUILD_VERSION = "0.1.3";

export default {
  // ? Creates output files
  mode: "production",
  // ? Allows accurate debugging with source code in browser
  devtool: "source-map", 

  /* // * Entry Points for URLs */
  entry: {
    // ? Bundle
    main: path.resolve(__dirname, "src/index.js"),
    // ? Bundled third party libraries used in main.
    // vendor: path.resolve(__dirname, "src/vendor.js"),
    // ? Service Worker Bundle.
    swReg: path.resolve(__dirname, "src/sw-reg.js"),
    // sw: path.resolve(__dirname, "src/src-sw"),
  },

  /* // * Output TRANSPILED files */
  output: { 
    // ? Transpiled Output File, Bundled JS
    path: path.resolve(__dirname, "dist"),
    filename: (pathData) => {
      if (pathData.chunk.name === "sw") {
        return "[name].js";
      }
      // ? Cache busting - only in prod
      return "[name].[contenthash:8].js"; 
    },
    chunkFilename: "[name].[contenthash:8].bundle.js",
    publicPath: "/",
    hashSalt: PROJECT_BUILD_VERSION
  },

  optimization: {
    moduleIds: "deterministic",
    // ? Single Entry Point
    runtimeChunk: "single",
    splitChunks : {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        }
      }
    }
  },

  plugins: [
    // ? Create external CSS file with cache-busting filename
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    }),

    // ? Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: "public/index.html",
      publicPath: "/",
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      // Properties defined here are available in index.html
      // using html Webpack Plugin.options.varName
      // trackJSToken: "INSERT YOUR TOKEN HERE",
    }),
    new InjectManifest({
      injectionPoint: "self.__precacheManifest",
      swSrc: path.resolve(__dirname, "src/src-sw.js"),
      swDest: "sw.js"
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      { test: /\.(png|jpg|jpeg|gif)$/i, type: 'asset/resource' },
      { test: /\.(svg)$/i, type: 'asset/inline', generator: {
        dataUrl: content => {
          content = content.toString();
          return svgToMiniDataURI(content);
        }
      }},
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
    ],
  },
};