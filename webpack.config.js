module.exports = {
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js?/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
        ]
    }
};