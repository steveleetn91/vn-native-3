const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
require('dotenv').config()
const ProxConfig = {
    target: 'http://localhost:9000/index.html?page=',
    secure: true,
    changeOrigin: true
};
module.exports = {
    entry: [
        './src/bootstrap.ts'
    ],
    mode: "production",
    devtool: "inline-source-map",
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/dist'),
        publicPath: "/",
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
            filename: 'styles.css'
        })],
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
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: process.env.PORT || 9000,
        hot: true,
        compress: false,
        proxy: {
            "/home": ProxConfig,
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 5120000,
        maxAssetSize: 5120000
    }
};