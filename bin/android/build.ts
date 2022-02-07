#!/usr/bin/env node
import * as cli from "cli";;
const AndroidBuildfs = require('fs');
const AndroidBuildframeworkInfo = './framework.json';
const AndroidBuildandroidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
try {
    const installProduction = () => {
        cli.exec("cp -r ./bin/android/java/Production.java ./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java",async (resp: any) => {
            cli.info(resp.toString());
            cli.ok("You need read Android document about how to upload app to Google Play! ");
        },async (resp: any) => {
            cli.info(resp.toString());
            cli.ok("You need read Android document about how to upload app to Google Play! ");
        })
    }
    const prepare = (next : Function) => {
        cli.exec("cd ./platforms/android/app/src/main && rm -rf ./assets && mkdir assets",(resp : any) => {
            return next();
        },(resp : any) => {
            return next();
        });
    }
    if (AndroidBuildfs.existsSync(AndroidBuildframeworkInfo) && AndroidBuildfs.existsSync(AndroidBuildandroidConfig)) {
        prepare(() => {
            cli.exec("vn3-web-build && cp -r ./platforms/web/build/* ./platforms/android/app/src/main/assets && cp -r ./platforms/android/views/index.html ./platforms/android/app/src/main/assets/index.html",(resp: any) =>{
                cli.info(resp.toString());
                cli.ok("Completed prepare building Androis OS");
                installProduction();
            },
            (resp: any) => {
                cli.info(resp.toString());
                cli.ok("Completed prepare building Androis OS");
                installProduction();
            });
        });
    }
}catch(error) {
    cli.error(error.toString());
}