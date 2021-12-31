const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
require('dotenv').config();
const webpackHelper = require('./helpers/webpack.vnf');
module.exports = {
    entry: webpackHelper.listPageNeedBuild(),
    mode:"production",
    devtool: "inline-source-map",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../../public/assets')
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
        })
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
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 2560000,
        maxAssetSize: 2560000
    }
};