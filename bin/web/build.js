#!/usr/bin/env node
let cli = require('cli');
const fs = require('fs')
const frameworkInfo = './framework.json'
try {
    let buildWeb = () => {
        cli.exec(`cp -r ./public ./platforms/web/build && cp -r ./framework.json ./platforms/web/build/framework.json 
        && cp -r ./platforms/web/views/production.html ./platforms/web/build/index.html `, (success) => {
            if (success) {
                cli.ok("Done!!!");
            }
        });
    }
    let buildStatic = () => {
        cli.exec("rm -rf ./public/assets && rm -rf ./platforms/web/build && npx webpack --config webpack.config.prod.js", (success) => {
            if (success) {
                cli.info(success.toString());
                cli.info("Waiting for web platform !!!");
                return buildWeb();
            }
        });
    }
    if (fs.existsSync(frameworkInfo)) {
        cli.ok("Starting build web ... ");
        //file exists
        buildStatic();
    }
} catch (err) {
    cli.error(err.toString());
}