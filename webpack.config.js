

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
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
      }
    
};