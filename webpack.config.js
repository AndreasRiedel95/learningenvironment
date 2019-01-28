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
    index: './src/js/index.js',
    server: './backend/server.js'
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'js/[name].bundle.js'
  },
  watch: true,
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


