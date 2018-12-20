'use strict'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import merge from 'webpack-merge'

import * as parts from './webpack.parts.babel'

const paths = parts.getPaths()

const commonConfig = merge([
  {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
      filename: '[name].[hash:20].js',
      path: paths.build
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.(scss|css|sass)$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'expanded',
                  sourceMap: true,
                  sourceMapContents: true
                }
              }
            ],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[hash:20].[ext]',
                limit: 8192
              }
            }
          ]
        }

      ]
    },
    plugins: [
      new CleanWebpackPlugin(paths.build),
      new ExtractTextPlugin('styles.[md5:contenthash:hex:20].css', {
        allChunks: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          map: {
            inline: false
          },
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ]
  },
  parts.loadPug({ pretty: true }),
  parts.loadJS({
    include: paths.src,
    exclude: /node_modules/
  })
])

module.exports = commonConfig
