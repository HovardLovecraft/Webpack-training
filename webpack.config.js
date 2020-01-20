'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathsToClean = [ 'dist'];
const cleanOptions = { root: __dirname, verbose: true, dry: false, exclude: [],};

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: './src/app.ts',
  },

output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
},

optimization: {
    splitChunks: {
        cacheGroups: {
            vendors: {
                name: 'vendors',
                chunks: 'all',
                reuseExistingChunk: true,
                priority: 1,
                enforce: true,
                test(module, chunks) {
                    const name = module.nameForCondition && module.nameForCondition();
                    return chunks.some(chunk => {
                        return chunk.name === 'main' && /[\\/]node_modules[\\/]/.test(name);
                    });
                }
            },
            secondary: {
                name: 'secondary',
                chunks: 'all',
                priority: 2,
                enforce: true,
                test(module, chunks) {
                    return chunks.some(chunk => chunk.name === 'secondary');
                }
            }
        }
    }
},

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
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new HtmlWebpackPlugin({
          template: __dirname + "/public/index.html",
          inject: 'body'
      })
    ],

  module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            loader: "eslint-loader",
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/
          },
          {
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', 'es2015']
              }
            }
          },
          { 
            test: /\.tsx?$/, 
            loader: "ts-loader" ,
            exclude: /(node_modules|bower_components)/,
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
  }
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
