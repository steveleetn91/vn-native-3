#!/usr/bin/env node
import * as cli from "cli";
const ElectronRemoveFs = require('fs');
const ElectronRemoveframeworkInfo = './framework.json';
try {
    if (ElectronRemoveFs.existsSync(ElectronRemoveframeworkInfo)) {
        cli.exec("cd ./platforms && rm -rf ./electron",(resp) => {
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