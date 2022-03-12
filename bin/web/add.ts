#!/usr/bin/env node
import * as cli from "cli";
const BrowserAddFs = require('fs');
const BrowserAddframeworkInfo = './framework.json';
try {
    if (BrowserAddFs.existsSync(BrowserAddframeworkInfo)) {
        cli.exec("cordova platform add browser",(resp) : void => {
            cli.info(resp.toString());
            cli.ok("Added");
        },(resp) : void => {
            cli.info(resp.toString());
            cli.ok("Added");
        })
    }
}catch(error) {
    cli.error(error.toString());
}