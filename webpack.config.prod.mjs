import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
//workbox-webpack-plugin
// import WorkboxPlugin from "workbox-webpack-plugin";

export default {
  // ? Creates output files
  mode: "production",
  // ? Allows accurate debugging with source code in browser
  devtool: "source-map", 

  /* // * Entry Points for URLs */
  entry: {
    // ? Bundle
    main: {
      import: path.resolve(__dirname, "src/index"),
      dependsOn: "vendor",
    },
    // ? Bundled third party libraries used in main.
    vendor: {
      import: path.resolve(__dirname, "src/vendor"),
    },
    // ? Service Worker Bundle.
    // sw-reg: path.resolve(__dirname, "src/sw-reg"),
    // sw: path.resolve(__dirname, "src/src-sw"),
  },

  /* // * Output TRANSPILED files */
  output: { 
    // ? Transpiled Output File, Bundled JS
    filename: ({runtime}) => {
      if (runtime === "sw") {
        return "[name].js";
      }
      // ? Cache busting - only in prod
      return "[name].[contenthash:8].js"; 
    },
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },

  optimization: {
    moduleIds: "deterministic",
    // ? Single Entry Point
    runtimeChunk: "single",
    splitChunks : {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
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

    /* new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers fast
      // and not allow "old" SWs
      clientsClaim: true,
      skipWaiting: true,
    }), */
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"], options: { outputPath: "style"} },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource', use: "file-loader", options: { name: "[contenthash:8].[ext]", outputPath: "images" } },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
    ],
  },
};