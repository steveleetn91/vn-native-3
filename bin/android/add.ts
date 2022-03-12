#!/usr/bin/env node
import * as cli from "cli";;
const Androidfs = require('fs');
const AndroidAddframeworkInfo = './framework.json';
const AndroidAddIP : any = require("ip");
const AndroidAddConfig = require("../../../config/config.json");
try {
    if (Androidfs.existsSync(AndroidAddframeworkInfo)) {
        cli.exec("cordova platforms add android && rm -rf ./platforms/android/app/src/main/assets/www/index.html",
            (resp: any): void => {
                cli.info(resp.toString());
                cli.ok("Android OS really for development! ");
                setupDevelopmentConfigXml();
            }, (resp: any): void => {
                cli.info(resp.toString());
                cli.ok("Android OS really for development! ");
                setupDevelopmentConfigXml();
            });
    }
    const setupDevelopmentConfigXml = async (): Promise<void> => {
        let configXml: string = await Androidfs.readFileSync('./platforms/android/app/src/main/res/xml/config.xml',
            { encoding: 'utf8', flag: 'r' });
        configXml = configXml.replaceAll("index.html", `http://${AndroidAddIP.address()}:${AndroidAddConfig.PORT + 1}`);
        await Androidfs.writeFileSync('./platforms/android/app/src/main/res/xml/config.xml', configXml);
        cli.ok("Please open Android Studio before start development Android");
    }
} catch (error) {
    cli.error(error.toString());
}