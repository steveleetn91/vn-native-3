#!/usr/bin/env node
import * as cli from "cli";
const iOSRemoveFs = require('fs');
const iOSRemoveframeworkInfo = './framework.json';
try {
    if (iOSRemoveFs.existsSync(iOSRemoveframeworkInfo)) {
        cli.exec("cordova platforms remove ios",(resp) => {
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