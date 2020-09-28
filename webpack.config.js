module.exports = {
    mode: 'development',
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        hot: true,
        compress: true,
        port: 8080,
    },
    module: {
        rules: [
            /* config.module.rule('babel') */
            {
                test: /\.(j|t)s(x?)$/,
                exclude: [/node_modules/],
                use: [
                    /* config.module.rule('babel').use('babel-loader') */
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            /* config.module.rule('css') */
            {
                test: /\.css$/,
                use: [
                    /* config.module.rule('css').use('mini-css') */
                    {
                        loader: require('mini-css-extract-plugin').loader,
                    },
                    /* config.module.rule('css').use('postcss-loader') */
                    {
                        loader: 'postcss-loader',
                    },
                    /* config.module.rule('css').use('css-loader') */
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            /* config.module.rule('less') */
            {
                test: /\.less$/,
                use: [
                    /* config.module.rule('less').use('mini-css') */
                    {
                        loader: require('mini-css-extract-plugin').loader,
                    },
                    /* config.module.rule('less').use('css-loader') */
                    {
                        loader: 'css-loader',
                    },
                    /* config.module.rule('less').use('postcss-loader') */
                    {
                        loader: 'postcss-loader',
                    },
                    /* config.module.rule('less').use('less-loader') */
                    {
                        loader: 'less-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        /* config.plugin('html-template') */
        new (require('html-webpack-plugin'))({
            template: 'src/index.html',
        }),
        /* config.plugin('clean-webpack-plugin') */
        new (require('clean-webpack-plugin').CleanWebpackPlugin)(),
        /* config.plugin('mini-css-extract-plugin') */
        new (require('mini-css-extract-plugin'))({
            filename: '[name].css',
        }),
    ],
    entry: {
        index: ['./src/index.js'],
    },
};
