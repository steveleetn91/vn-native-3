#!/usr/bin/env node
const Androidcli = require("cli");
const AndroidBuildfs = require('fs');
const AndroidBuildframeworkInfo = './framework.json';
const AndroidBuildandroidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
try {
    const installProduction = () => {
        Androidcli.exec("cp -r ./bin/android/java/Production.java ./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java",async (resp: any) => {
            Androidcli.info(resp.toString());
            Androidcli.ok("You need read Android document about how to upload app to Google Play! ");
        },async (resp: any) => {
            Androidcli.info(resp.toString());
            Androidcli.ok("You need read Android document about how to upload app to Google Play! ");
        })
    }
    const prepare = (next : Function) => {
        Androidcli.exec("cd ./platforms/android/app/src/main && rm -rf ./assets && mkdir assets",(resp : any) => {
            return next();
        },(resp : any) => {
            return next();
        });
    }
    if (AndroidBuildfs.existsSync(AndroidBuildframeworkInfo) && fs.existsSync(AndroidBuildandroidConfig)) {
        prepare(() => {
            Androidcli.exec("vn3-web-build && cp -r ./platforms/web/build/* ./platforms/android/app/src/main/assets && cp -r ./platforms/android/views/index.html ./platforms/android/app/src/main/assets/index.html",(resp: any) =>{
                Androidcli.info(resp.toString());
                Androidcli.ok("Completed prepare building Androis OS");
                installProduction();
            },
            (resp: any) => {
                Androidcli.info(resp.toString());
                Androidcli.ok("Completed prepare building Androis OS");
                installProduction();
            });
        });
    }
}catch(error) {
    Androidcli.error(error.toString());
}