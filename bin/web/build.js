#!/usr/bin/env node
let cli = require('cli');
const fs = require('fs')
const webpackConfig = './webpack.config.js'
try {
    let buildWeb = () => {
        cli.exec("mkdir -p ./platforms/web/dist && rm -rf ./platforms/web && cp -r ./public ./platforms/web && cp -r ./framework.json ./platforms/web/framework.json ", (success) => {
            if (success) {
                cli.ok("Done!!!");
            }
        });
    }
    let buildStatic = () => {
        cli.exec("rm -rf ./public/dist && npx webpack --config webpack.config.js", (success) => {
            if (success) {
                cli.info(success.toString());
                cli.info("Waiting for web platform !!!");
                return buildWeb();
            }
        });
    }
    if (fs.existsSync(webpackConfig)) {
        cli.ok("Starting build web ... ");
        //file exists
        buildStatic();
    }
} catch (err) {
    cli.error(err.toString());
}