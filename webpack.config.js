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
    validate_form: './src/js/admin/validate_form.js',
    admin_index: './src/js/admin/admin_index.js',
    admin_form: './src/js/admin/admin_form.js',
    admin_searchListOverview: './src/js/admin/searchoverviewlist.js',
    index: './src/js/index.js',
    test: './src/js/testHandler.js',
    scrollPolyfill: './src/js/scrollPolyfill.js', 
    init: './src/js/init.js'
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: '[name].bundle.js'
  },
  devServer: {
    //For some reason live reloading not working – feel free to fix
    publicPath: '/js/',
    hot: true,
    contentBase: './views',
    watchContentBase: true
  },
   module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader?retainLines=true", 
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};


