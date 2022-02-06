#!/usr/bin/env node
const AndroidRemovecli = require("cli");
const AndroidRemovefs = require('fs');
const frameworkInfo = './framework.json';
const androidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
try {
    if (AndroidRemovefs.existsSync(frameworkInfo) && AndroidRemovefs.existsSync(androidConfig)) {
        AndroidRemovecli.exec("rm -rf ./platforms/android",(resp : any) =>{
            AndroiDevelopmentcli.info(resp.toString());
            AndroidRemovecli.ok("Completed remove Androis OS");
        } ,
        (resp : any) => {
            AndroiDevelopmentcli.info(resp.toString());
            AndroidRemovecli.ok("Completed remove Androis OS");
        });
    }
}catch(error) {
    AndroidRemovecli.error(error.toString());
}