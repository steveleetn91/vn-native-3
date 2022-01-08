#!/usr/bin/env node
const cli = require("cli");
const fs = require('fs');
const frameworkInfo = './framework.json';
const androidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
try {
    if (fs.existsSync(frameworkInfo) && fs.existsSync(androidConfig)) {
        cli.exec("vn3-web-build && rm -rf ./platforms/android/app/src/main/assets/* && cp -r ./platforms/web/build/* ./platforms/android/app/src/main/assets",(resp) =>{
            cli.info(resp);
            cli.ok("Completed prepare building Androis OS");
        } ,
        (resp) => {
            cli.info(resp);
            cli.ok("Completed prepare building Androis OS");
        });
    }
}catch(error) {
    cli.error(error.toString());
}