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
    const prepare = (next) => {
        cli.exec("cd ./platforms/android/app/src/main && rm -rf ./assets && mkdir assets",(req,res) => {
            return next();
        },(req,res) => {
            return next();
        });
    }
    if (fs.existsSync(frameworkInfo) && fs.existsSync(androidConfig)) {
        prepare(() => {
            cli.exec("vn3-web-build && cp -r ./platforms/web/build/* ./platforms/android/app/src/main/assets && cp -r ./platforms/android/views/index.html ./platforms/android/app/src/main/assets/index.html",(resp) =>{
                cli.info(resp);
                cli.ok("Completed prepare building Androis OS");
                installProduction();
            },
            (resp) => {
                cli.info(resp);
                cli.ok("Completed prepare building Androis OS");
                installProduction();
            });
        });
    }
}catch(error) {
    cli.error(error.toString());
}