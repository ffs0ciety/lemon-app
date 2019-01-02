

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                use: ['babel-loader'],
                test: /\.js$/,
                exclude: /node_ modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              },
            {
                test: /\.(svg|jpg|png)$/,
                loader: ['url-loader']
            }
        ]
    },
    externals: {
        jquery: 'jQuery'
      },
    devServer: {
        historyApiFallback: true,
      }
    
};