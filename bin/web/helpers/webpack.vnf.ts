import WebPackVNFInterface from "./webpack.vnf.interface";
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const fs = require('fs');
const webpack = require('webpack');
const cli = require('cli');
const output = `${__dirname}/../../../../public/assets`;
const iosOutput = `${__dirname}/../../../../platforms/ios/www`
const staticDirectory = `${__dirname}/../../../../public`;
const iosStaticDirectory = `${__dirname}/../../../../public`

let configWebServe = require('dotenv').config().parsed;

let targetProxy : string = configWebServe.DOMAIN ? configWebServe.DOMAIN : "";

let servePort :number = configWebServe.PORT ? configWebServe.PORT : 9000;

const ProxConfig = {
    target: `${targetProxy}/index.html?page=`,
    secure: true,
    changeOrigin: false
};
export default class WebPackVNF implements WebPackVNFInterface {
    listPage() : Array<any> {
        const directoryPage = __dirname + '/../../../../pages';
        let data : Array<any>
        data = [];
        let list = fs.readdirSync(directoryPage);
        if (list.length < 1) {
            return data;
        }
        return list;
    }
    listPageNeedBuild() : Array<any>{
        const directoryPage = __dirname + '/../../../../platforms/web/tmp/pages/';
        let data : Array<any>;
        data = []
        let list = fs.readdirSync(directoryPage);
        if (list.length < 1) {
            return data;
        }
        for (let i = 0; i < list.length; i++) {
            if (list[i].includes("ts")) {
                let key = list[i].toString().replaceAll('.ts', '').replaceAll('-', '_');
                data[key] = `${__dirname}/../../../../platforms/web/tmp/pages/${list[i]}`;
            }
            if ((i + 1) === list.length) {
                return data;
            }
        }
    }
    buildSinglePage(pageName : string,rebuild : boolean = true,callback : Function) : void {
        const build = async (next : Function) => {
            const lazyloadTemplate = await fs.readFileSync(`${__dirname}/../../../../platforms/web/tmp/lazyload.vnf`,
                { encoding: 'utf8', flag: 'r' });

            const tmp_lazyloadTemplate = lazyloadTemplate.replaceAll('{page_name}', pageName);
            fs.writeFileSync(`${__dirname}/../../../../platforms/web/tmp/pages/${pageName}.ts`, tmp_lazyloadTemplate);
            return next();
        }
        let entry : any = {}
        entry[pageName] = `${__dirname}/../../../../platforms/web/tmp/pages/${pageName}.ts`
        const config = {
            entry: entry,
            mode: "production",
            devtool: "inline-source-map",
            output: {
                filename: '[name].bundle.js',
                path: output + `/${pageName}`,
                clean: rebuild,
            },
            optimization: {
                minimizer: [
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
                    },
                    {
                        test: /\.html$/i,
                        loader: "html-loader",
                    }
                ],
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js'],
            },
            devServer: {
                static: {
                    directory: staticDirectory,
                },
                port: servePort,
                compress: false,
                liveReload: false,
                proxy: {
                    "/page": ProxConfig,
                }
            },
            performance: {
                hints: "warning",
                maxEntrypointSize: 2560000,
                maxAssetSize: 2560000
            }
        }
        build(() => {
            webpack(config, (err : any, stats: any) => {
                if (err) {
                     cli.error(err.toString());
                }

                if (stats.hasErrors()) {
                     cli.error(stats.toString());
                }

                 cli.info(stats);
                 if(callback) {
                     return callback();
                 }
            });
        });
    }
    buildRouterPage (rebuild : boolean = true) : void {
        const config = {
            entry: {
                app : `${__dirname}/../../../../src/bootstrap.ts`,
            },
            mode:"production",
            devtool: "inline-source-map",
            output: {
                filename: '[name].bundle.js',
                path: output + '/app',
                clean: rebuild,
            },
            optimization: {
                minimizer: [
                    
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
                    },
                    {
                        test: /\.html$/i,
                        loader: "html-loader",
                    }
                ],
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js'],
            },
            devServer: {
                static: {
                    directory: staticDirectory,
                },
                port: servePort,
                compress: false,
                liveReload:true,
                proxy: {
                    "/page": ProxConfig,
                }
            },
            performance: {
                hints: "warning",
                maxEntrypointSize: 2560000,
                maxAssetSize: 2560000
            }
        }
        webpack(config, (err : any, stats : any) => {
            if (err) {
                return cli.error(err.toString());
            }

            if (stats.hasErrors()) {
                return cli.error(stats.toString());
            }

            return cli.info(stats);
        });
    }
    buildSinglePageiOS(pageName : string,rebuild : boolean = true,callback : Function) : void {
        const build = async (next : Function) => {
            const lazyloadTemplate = await fs.readFileSync(`${__dirname}/../../../../platforms/web/tmp/lazyload.vnf`,
                { encoding: 'utf8', flag: 'r' });

            const tmp_lazyloadTemplate = lazyloadTemplate.replaceAll('{page_name}', pageName);
            fs.writeFileSync(`${__dirname}/../../../../platforms/web/tmp/pages/${pageName}.ts`, tmp_lazyloadTemplate);
            return next();
        }
        let entry : any = {};
        entry[pageName] = `${__dirname}/../../../../platforms/web/tmp/pages/${pageName}.ts`
        const config = {
            entry: entry,
            mode: "production",
            devtool: "inline-source-map",
            output: {
                filename: '[name].bundle.js',
                path: iosOutput + `/`,
                clean: rebuild,
            },
            optimization: {
                minimizer: [
                    
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
                    },
                    {
                        test: /\.html$/i,
                        loader: "html-loader",
                    }
                ],
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js'],
            },
            devServer: {
                static: {
                    directory: iosStaticDirectory,
                },
                port: servePort,
                compress: false,
                liveReload: false,
                proxy: {
                    "/page": ProxConfig,
                }
            },
            performance: {
                hints: "warning",
                maxEntrypointSize: 2560000,
                maxAssetSize: 2560000
            }
        }
        build(() => {
            webpack(config, (err : any, stats : any) => {
                if (err) {
                     cli.error(err.toString());
                }

                if (stats.hasErrors()) {
                     cli.error(stats.toString());
                }

                 cli.info(stats);
                 if(callback) {
                     return callback();
                 }
            });
        });
    }
    buildRouterPageiOS(rebuild : boolean = true) : void {
        const config = {
            entry: {
                app : `${__dirname}/../../../../src/bootstrap.ts`,
            },
            mode:"production",
            devtool: "inline-source-map",
            output: {
                filename: '[name].bundle.js',
                path: iosOutput + '/',
                clean: rebuild,
            },
            optimization: {
                minimizer: [
                    
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
                    },
                    {
                        test: /\.html$/i,
                        loader: "html-loader",
                    }
                ],
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js'],
            },
            devServer: {
                static: {
                    directory: iosStaticDirectory,
                },
                port: servePort,
                compress: false,
                liveReload:true,
                proxy: {
                    "/page": ProxConfig,
                }
            },
            performance: {
                hints: "warning",
                maxEntrypointSize: 2560000,
                maxAssetSize: 2560000
            }
        }
        webpack(config, (err : any, stats : any) => {
            if (err) {
                return cli.error(err.toString());
            }

            if (stats.hasErrors()) {
                return cli.error(stats.toString());
            }

            return cli.info(stats);
        });
    }
}