#!/usr/bin/env node 
import * as cli from "cli";
let iOSAddfs : any = require('fs');
 let iOSAddframeworkInfoFile : string = './framework.json';
 const ioSAddIPServe = require("ip");
 const ioSAddconfig = require("../../../config/config.json");
if (iOSAddfs.existsSync(iOSAddframeworkInfoFile)) {
    const setupDevelopmentConfigXml = async (): Promise<void> => {
        let allData : Array<string> = await iOSAddfs.readdirSync("./platforms/ios");
        for(let i=0;i<allData.length;i++) {
            if(iOSAddfs.existsSync(`./platforms/ios/${allData[i]}/config.xml`)) {
                 let configXml: string = await iOSAddfs.readFileSync(`./platforms/ios/${allData[i]}/config.xml`,
                    { encoding: 'utf8', flag: 'r' });
                configXml = configXml.replaceAll("index.html", `http://${ioSAddIPServe.address()}:${ioSAddconfig.PORT + 2}/index.html`);
                await iOSAddfs.writeFileSync(`./platforms/ios/${allData[i]}/config.xml`, configXml);
                cli.ok("Please open Xcode and run app");
            }
        }
    }
    cli.exec("cordova platform add ios && rm -rf ./platforms/ios/www/index.html",(resp : any) => {
            cli.info(resp.toString());
            setupDevelopmentConfigXml();
        },(resp : any) : void => {
            cli.info(resp.toString());
            setupDevelopmentConfigXml();
        });
}
