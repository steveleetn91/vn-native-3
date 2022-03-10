#!/usr/bin/env node
import * as cli from "cli";
const AndroidBuildIp = require("ip");
const AndroidBuildfs = require('fs');
const AndroidBuildframeworkInfo = './framework.json';
const AndroidBuildandroidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
const AndroidBuilConfigJson = require("../../../config/config.json");
try {
    
    const prepare : Function = (next : Function) : void => {
        cli.exec("cd ./platforms/android/app/src/main/assets/www && rm -rf ./assets && mkdir assets",(resp : any) : Function => {
            return next();
        },(resp : any)  : Function => {
            return next();
        });
    }
    const setupDevelopmentConfigXmlProd = async (callback : Function): Promise<void> => {
        let configXml: string = await AndroidBuildfs.readFileSync('./platforms/android/app/src/main/res/xml/config.xml',
            { encoding: 'utf8', flag: 'r' });
        configXml = configXml.replaceAll(`http://${AndroidBuildIp.address()}:${AndroidBuilConfigJson.PORT + 1}`,"index.html");
        await AndroidBuildfs.writeFileSync('./platforms/android/app/src/main/res/xml/config.xml', configXml);
        cli.ok("Please open Android Studio and run app");
        return callback();
    }
    if (AndroidBuildfs.existsSync(AndroidBuildframeworkInfo) && AndroidBuildfs.existsSync(AndroidBuildandroidConfig)) {
        prepare(() : void => {
            cli.exec("vn3-web-build && cp -r ./www/* ./platforms/android/app/src/main/assets/www && cp -r ./bin/android/views/index.html ./platforms/android/app/src/main/assets/www/index.html",
            (resp: any) : void =>{
                setupDevelopmentConfigXmlProd(() => {
                    cli.info(resp.toString());
                    cli.ok("Completed prepare building Androis OS");    
                })
            },
            (resp: any) : void => {
                setupDevelopmentConfigXmlProd(() => {
                    cli.info(resp.toString());
                    cli.ok("Completed prepare building Androis OS");    
                })
            });
        });
    }
}catch(error) {
    cli.error(error.toString());
}