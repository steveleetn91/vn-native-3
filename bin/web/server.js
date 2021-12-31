#!/usr/bin/env node
let cli = require('cli');
const fs = require('fs')
const frameworkInfo = './framework.json'
try {
    
    if (fs.existsSync(frameworkInfo)) {
        //file exists
        cli.exec(`npx webpack serve --config webpack.config.dev.js --mode=production --live-reload`,(resp) => {
            cli.info(resp.toString());
        },(resp) => {
            cli.info(resp.toString());
        })
        cli.exec('npx webpack watch --config webpack.config.dev.js',(resp) => {
            cli.info(resp.toString());
        },(resp) => {
            cli.info(resp.toString());
        })
        cli.exec('npx webpack watch --config ./bin/web/webpack.lazyload.js',(resp) => {
            cli.info(resp.toString());
        },(resp) => {
            cli.info(resp.toString());
        })
    }
} catch (err) {
    cli.error(err.toString());
}