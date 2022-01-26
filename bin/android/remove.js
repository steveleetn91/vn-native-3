#!/usr/bin/env node
const cli = require("cli");
const fs = require('fs');
const frameworkInfo = './framework.json';
const androidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
try {
    if (fs.existsSync(frameworkInfo) && fs.existsSync(androidConfig)) {
        cli.exec("rm -rf ./platforms/android",(resp) =>{
            cli.info(resp);
            cli.ok("Completed remove Androis OS");
        } ,
        (resp) => {
            cli.info(resp);
            cli.ok("Completed remove Androis OS");
        });
    }
}catch(error) {
    cli.error(error.toString());
}