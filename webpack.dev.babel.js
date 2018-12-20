import merge from 'webpack-merge';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import * as parts from './webpack.parts.babel';

const paths = parts.getPaths();

const commonConfig = merge([
  {
    optimization: parts.loadOptimization(),
    devtool: 'eval-cheap-module-source-map',
    entry: `${paths.src}/index.js`,
    devServer: {
      port: 9001,
      contentBase: paths.build
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'css-loader',
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
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[path][name].[ext]?hash=[hash:20]',
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new StyleLintPlugin({
        syntax: 'scss'
      })
    ]
  },
  parts.loadPug({pretty: true}),
  parts.loadJS({
    include: paths.src,
    exclude: /node_modules/
  })
]);

module.exports = commonConfig;
