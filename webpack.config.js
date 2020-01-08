'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pathsToClean = [ 'dist'];
const cleanOptions = { root: __dirname, verbose: true, dry: false, exclude: [],};

module.exports = {
    entry: "./home.ts",


    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        })
    ],



    module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ["babel-loader", "eslint-loader"]
          },
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                }
              }
            ],
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: [
              
              { loader: 'style-loader' },
              
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              },
              
              { loader: 'sass-loader' }
            ]
          }
        ]
  },  
  resolve: {
    modules: ['node_modules'],
    extensions: [".js", ".json", ".jsx", ".css", '.tsx', '.ts'],
    alias: {
      
      "module": "new-module",
      
      "only-module$": "new-module",
      
      "module": path.resolve(__dirname, "app/third/module.js"),
      
    }
  },

  resolveLoader: {
    modules: ['node_modules'],
    mainFields: ['*-loader', '*'],
    extensions: [".js", ".json", ".jsx", ".css", '.tsx', '.ts'],
    alias: {
    "module": "new-module",
    "only-module$": "new-module",
    "module": path.resolve(__dirname, "app/third/module.js"), 
    }
  },

  output: {
    filename: "build.js",
    library: "home"
  },

};

if(NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  )
}
