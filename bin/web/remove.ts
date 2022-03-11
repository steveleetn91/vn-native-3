#!/usr/bin/env node
import * as cli from "cli";
const WebRemoveFs = require('fs');
const WebRemoveframeworkInfo = './framework.json';
try {
    if (WebRemoveFs.existsSync(WebRemoveframeworkInfo)) {
        cli.exec("cordova platforms remove browser",(resp) => {
            cli.info(resp.toString());
            cli.ok("Removed");
        },(resp) => {
            cli.info(resp.toString());
            cli.ok("Removed");
        })
    }
}catch(error) {
    cli.error(error.toString());
}