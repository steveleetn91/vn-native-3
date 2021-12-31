const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
require('dotenv').config()
const ProxConfig = {
    target: `${process.env.DOMAIN}/index.html?page=`,
    secure: true,
    changeOrigin: false
};
module.exports = {
    entry: {
        app : './src/bootstrap.ts',
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
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: process.env.PORT || 9000,
        compress: false,
        liveReload:true,
        proxy: {
            "/home": ProxConfig,
        }
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 2560000,
        maxAssetSize: 2560000
    }
};