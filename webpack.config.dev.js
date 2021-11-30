const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require('webpack');
require('dotenv').config()
const ProxConfig = {
    target: `${process.env.DOMAIN}/index.html?page=`,
    secure: false,
    changeOrigin: false
};
module.exports = {
    entry: {
        hot : 'webpack/hot/dev-server.js',
        app : './src/bootstrap.ts',
        client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true'
    },
    mode:"production",
    devtool: "inline-source-map",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/assets'),
        clean: true,
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'scss'],
    },
    devServer: {
        historyApiFallback: true,
        static: [
            './public',
            './assets'
        ],
        port: process.env.PORT || 9000,
        hot: true,
        proxy: {
            "/home": ProxConfig,
        },
        watchFiles: ['./src/*', './assets/styles/*','./pages/*'],
        open: true,
        client: {},
    },
    performance: {
        hints: false,
        maxEntrypointSize: 5120000,
        maxAssetSize: 5120000
    }
};