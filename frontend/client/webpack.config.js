const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //빌드될때마다 안쓰는 파일들을 삭제
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //CSS를 추출해서 파일로 저장하는 플러그인


module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build")
  },
  // 소스코드를 수정할때마다 알아서 웹팩이 빌드해줌
  devServer: {
    contentBase: path.resolve("./build"),
    index: "index.html",
    port: 3000
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
			template: './public/index.html', // public/index.html 파일을 읽는다.
      filename: 'index.html' // output으로 출력할 파일은 index.html 이다.
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new CleanWebpackPlugin(),
  ]
};