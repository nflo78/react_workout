const path = require('path');


module.exports = {
  entry: path.join(__dirname, './client/src/index.jsx'),
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js',
    // publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader',
      },
    ],
  },
  // devServer: {
  //   historyApiFallback: true,
  // },
  // devServer: {
  //   port: 8000,
  //   contentBase: ['./src', './public'],
  //   inline: true,
  //   hot: true,
  // },
};
