const webpack =require('webpack')
const path = require('path');

// build the doc file
const docotron_map = require('../../output/docmap.json')




module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(md)$/i,
          type: 'asset/source'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
    },
    devServer: {
      static: path.resolve(__dirname, './dist'),
    },
    // plugins: [
    //   new webpack.DefinePlugin({
    //     // MAP_PATH: JSON.stringify(docotron_map)
    //   })
  
    // ]
  };