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
    admin_codeMirror: './src/js/admin/codeMirror_admin.js',
    index: './src/js/index.js',
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


