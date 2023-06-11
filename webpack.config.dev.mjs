import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
// import { InjectManifest } from "workbox-webpack-plugin";
// workbox-webpack-plugin

export default {
  mode: "development",
  devtool: "eval-source-map", // ? Allows accurate debugging with source code in browser
  
  /* // * Entry Points for URLs 
  */
  entry: { // * Code Splitting
    app: path.resolve(__dirname, "src/index.js"),
    swReg: path.resolve(__dirname, "src/sw-reg.js"),
    sw: path.resolve(__dirname, "src/src-sw.js"),
  },

  /* // * Output SIMULATED files */
  output: { // ? Transpiled Output File, Bundled JS
    path: path.resolve(__dirname, "dist"), // ? create a simulated file from webpack's mem to allow debugging
    publicPath: "/",
    filename: "[name].js" //? Use entry points [name]
  },

  plugins: [
    // ? Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      publicPath: "/",
      filename: "index.html",
    }),

    /* new WorkboxPlugin.GenerateSW({
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: "cacheFirst",
          options: {
            expiration: { maxEntries: 10 },
            cacheName: "images",
          }
        }
      ]
    }) */
  ],

  module: {
    rules: [
      { test: /\.js$/i, exclude: [/node_modules/], use: ["babel-loader"] },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource', use: "file-loader" },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
    ],
  },
};