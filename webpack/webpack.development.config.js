const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //设置环境模式为开发，业务逻辑通过process.env.NODE_ENV获取当前的运行环境
  mode: "development",
  //使用默认配置，README.md中有link说明
  context: path.resolve(__dirname),
  /*错误信息是不是提示的很详细,我们在srouce里面能看到我们写的代码，也能打断点调试哦~*/
  devtool: "inline-source-map",
  //入口文件
  entry: ["@babel/polyfill",path.resolve(__dirname, "../app/index.js")],
  //开发时，打包后文件
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].[hash:8].js',   //dev---hash;production---chunkhash；和webpack-dev-server --hot不兼容
    chunkFilename: 'js/[name].[chunkhash:8].js'
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
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
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
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
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

  devServer: {
    contentBase: path.resolve(__dirname, '../build'),//URL的根目录。如果不设定的话，默认指向项目根目录
    historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline: true, //实时刷新
    hot: true, // 启用 webpack 的模块热替换特性
    port: 20001,
    host:'0.0.0.0',
    proxy: {
        "/exchange/*": {
            "target": "https://www.binance.co",
            "changeOrigin": true
        }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Trading Platform",
      template: "../app/index.temp.html",
      favicon: "../public/favicon.ico"
    }),

    //永远不要在生产环境(production)下启用 HMR,即没有devServer出现
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
      // __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
      //'SET_URL': JSON.stringify("http://dev.example.com")
    })
  ]
};
