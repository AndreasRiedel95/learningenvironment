const path = require("path");

module.exports = {
  mode: 'development',
  node: {
    global: true,
    fs: "empty",
    module: "empty",
    net: 'empty',
    dns: 'empty',
    tls: 'empty'
  },
  entry: {
    polyfill: 'babel-polyfill',
    admin_codeMirror: './src/js/admin/codeMirror_admin.js',
    quill_setUp: './src/js/admin/quill_setUp.js',
    index: './src/js/index.js',
    init: './src/js/initSVG.js'
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: '[name].bundle.js'
  },
  devServer: {
    //For some reason live reloading not working – feel free to fix
    publicPath: '/js/',
    hot: true,
    contentBase: path.resolve(__dirname, "./views"),
    watchContentBase: true
  },
   module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};


