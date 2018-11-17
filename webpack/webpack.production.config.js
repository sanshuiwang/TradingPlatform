const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  //设置环境模式为开发，业务逻辑通过process.env.NODE_ENV获取当前的运行环境
  mode: "production",
  //使用默认配置，README.md中有link说明
  context: path.resolve(__dirname),

  devtool: "source-map",
  //入口文件
  entry: ["@babel/polyfill",path.resolve(__dirname, "../app/index.js")],
  //开发时，打包后文件
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "demandJs/[name].[chunkhash:8].js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "../app")],
        exclude: [path.resolve(__dirname, "../node_modules")],
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|bmp)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "images/[name]-[hash:8].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "fonts/[name]-[hash:8].[ext]"
        }
      },
    ]
  },

  //免文件导入时后缀名
  resolve: {
    extensions: [".js", ".jsx"]
  },

  plugins: [

    // webpack 内置的 banner-plugin
    new webpack.BannerPlugin("Copyright by 768188667@qq.com"),

    new HtmlWebpackPlugin({
      title: "Webpack4-GO",
      template: "../app/index.temp.html",
      favicon: "../public/favicon.ico"
    }),

    new webpack.DefinePlugin({
      // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
      // __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
      //'SET_URL': JSON.stringify("http://dev.example.com")
    }),

    new CleanWebpackPlugin(["build/*"], {
      root: path.resolve(__dirname, "..")
    }),

    new webpack.HashedModuleIdsPlugin(),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[chunkhash:8].css",
      chunkFilename: "css/[name].[chunkhash:8].css"
    }),

    new UglifyJsPlugin({
      sourceMap: true
    }),

  ],

  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]components[\\/]/,
          name: "chunkJs/commons",
          chunks: "initial",
          minChunks: 2,
          priority: 10,
          enforce: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunkJs/vendors",
          chunks: "all",
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: "chunkJs/manifest"
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }

}
