#!/usr/bin/env node 
import * as cli from "cli";
let iOSProdfs : any = require('fs');
let ioSIPProd : any = require("ip");
let iOSBuildframeworkInfoFile : string = './framework.json';
const iOSconfig = require("../../../config/config.json");
const xcodeprojectBuild : Function = (next : Function ) : void => {
    cli.exec("cordova build ios",
    (info : any) : Function => {
        cli.info(info);
        return next();
    },(success : any) : Function => {
        cli.info(success.toString());
        return next();
    });
}
const setupProdConfigXml = async (callback : Function): Promise<void> => {
    let allData : Array<string> = await iOSProdfs.readdirSync("./platforms/ios");
    for(let i=0;i<allData.length;i++) {
        if(iOSProdfs.existsSync(`./platforms/ios/${allData[i]}/config.xml`)) {
             let configXml: string = await iOSProdfs.readFileSync(`./platforms/ios/${allData[i]}/config.xml`,
                { encoding: 'utf8', flag: 'r' });
            configXml = configXml.replaceAll(`http://${ioSIPProd.address()}:${iOSconfig.PORT + 2}/index.html`,"index.html");
            await iOSProdfs.writeFileSync(`./platforms/ios/${allData[i]}/config.xml`, configXml);
            callback();
        }
    }
}
const WWW : Function = () : void => {
    cli.exec("cp -r ./www/* ./platforms/ios/www && cp -r ./bin/ios/views/production.ejs ./platforms/ios/www/index.html",
    (info : any) : void => { 
        cli.info(info); 
        setupProdConfigXml(() => {
            xcodeprojectBuild(() => {
                cli.ok("Please open Xcode and run app");
            });
        })
        
    } ,(info : any) : void => {
        cli.info(info); 
        setupProdConfigXml(() => {
            xcodeprojectBuild(() => {
                cli.ok("Please open Xcode and run app");
            });
        })
    })
}
if (iOSProdfs.existsSync(iOSBuildframeworkInfoFile)) {
    WWW();
}
