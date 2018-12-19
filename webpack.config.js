// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');
//
// module.exports = {
//   entry: {
//     app: './src/index.js'
//   },
//   // output: {
//   //   path: path.resolve(__dirname, 'dist'),
//   //   filename: '[name].[hash].js'
//   // },
//   optimization: {
//     usedExports: true
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader'
//         }
//       },
//       // {
//       //   test: /\.scss$/,
//       //   use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
//       // }
//       {
//         test: /\.(scss|css)$/,
//         use: [
//           {
//             // creates style nodes from JS strings
//             loader: "style-loader",
//             options: {
//               sourceMap: true
//             }
//           },
//           {
//             // translates CSS into CommonJS
//             loader: "css-loader",
//             options: {
//               sourceMap: true
//             }
//           },
//           {
//             // compiles Sass to CSS
//             loader: "sass-loader",
//             options: {
//               outputStyle: 'expanded',
//               sourceMap: true,
//               sourceMapContents: true
//             }
//           }
//           // Please note we are not running postcss here
//         ]
//       }
//     ]
//   },
//   devtool: 'inline-source-map',
//   devServer: {
//     contentBase: './dist',
//     hot: true,
//     port: 9001
//   },
//   plugins: [
// //     new CleanWebpackPlugin('dist', {}),
// //     new MiniCssExtractPlugin({
// //       filename: 'style.[contenthash].css'
// //     }),
// //     new HtmlWebpackPlugin({
// //       inject: true,
// //       // hash: true,
// //       template: './src/index.html',
// //       filename: 'index.html'
// //     }),
// //     // new WebpackMd5Hash(),
// //     new webpack.HotModuleReplacementPlugin()
// //   ]
// // };

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: './src/index.js',
    // output: {
    //   path: path.resolve(__dirname, 'dist'),
    //   filename: '[name].[hash].js'
    // },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, "dist")
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          }
          // Please note we are not running postcss here
        ]
      }
      ,
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: '[path][name].[ext]?hash=[hash:20]',
              limit: 8192
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    })
  ]
};
