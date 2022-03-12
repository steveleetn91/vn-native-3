#!/usr/bin/env node
import * as cli from "cli";
const BrowserAddFs = require('fs');
const BrowserAddframeworkInfo = './framework.json';
try {
    if (BrowserAddFs.existsSync(BrowserAddframeworkInfo)) {
        const setupDevWeb: Function = (callback: Function): void => {
            cli.exec("rm -rf ./platforms/browser/www/index.html", (resp): Function => {
                return callback();
            }, (resp): Function => {
                return callback();
            })
        }
        cli.exec("cordova platform add browser", (resp): void => {
            cli.info(resp.toString());
            setupDevWeb(() => {
                cli.ok("Added");
            })
        }, (resp): void => {
            cli.info(resp.toString());
            setupDevWeb(() => {
                cli.ok("Added");
            })
        })
    }
} catch (error) {
    cli.error(error.toString());
}