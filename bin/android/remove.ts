#!/usr/bin/env node
import * as cli from "cli";;
const AndroidRemovefs = require('fs');
const frameworkInfo = './framework.json';
const androidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
try {
    if (AndroidRemovefs.existsSync(frameworkInfo) && AndroidRemovefs.existsSync(androidConfig)) {
        cli.exec("cordova platforms rm android",
        (resp : any) : void =>{
            cli.info(resp.toString());
            cli.ok("Completed remove Androis OS");
        },
        (resp : any) : void => {
            cli.info(resp.toString());
            cli.ok("Completed remove Androis OS");
        });
    }
}catch(error) {
    cli.error(error.toString());
}