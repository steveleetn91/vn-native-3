#!/usr/bin/env node
import * as cli from "cli";
const ElectronAddFs = require('fs');
const ElectgronAddframeworkInfo = './framework.json';
try {
    if (ElectronAddFs.existsSync(ElectgronAddframeworkInfo)) {
        cli.exec("cd platforms && mkdir electron",(resp) => {
            cli.info(resp.toString());
            cli.ok("Added");
        },(resp) => {
            cli.info(resp.toString());
            cli.ok("Added");
        })
    }
}catch(error) {
    cli.error(error.toString());
}