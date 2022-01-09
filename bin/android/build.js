#!/usr/bin/env node
const cli = require("cli");
const fs = require('fs');
const frameworkInfo = './framework.json';
const androidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
try {
    const installProduction = () => {
        cli.exec("cp -r ./bin/android/java/Production.java ./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java",async (resp) => {
            cli.info(resp);
            cli.ok("You need read Android document about how to upload app to Google Play! ");
        },async (resp) => {
            cli.info(resp);
            cli.ok("You need read Android document about how to upload app to Google Play! ");
        })
    }
    if (fs.existsSync(frameworkInfo) && fs.existsSync(androidConfig)) {
        cli.exec("vn3-web-build && rm -rf ./platforms/android/app/src/main/assets/* && cp -r ./platforms/web/build/* ./platforms/android/app/src/main/assets && cp -r ./platforms/android/views/index.html ./platforms/android/app/src/main/assets/index.html",(resp) =>{
            cli.info(resp);
            cli.ok("Completed prepare building Androis OS");
            installProduction();
        } ,
        (resp) => {
            cli.info(resp);
            cli.ok("Completed prepare building Androis OS");
            installProduction();
        });
    }
}catch(error) {
    cli.error(error.toString());
}