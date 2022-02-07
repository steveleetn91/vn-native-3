#!/usr/bin/env node 
import * as cli from "cli";;
import WebPackVNF from '../web/helpers/webpack.vnf';
let fs : any = require('fs');
let iOSAddframeworkInfoFile : string = './framework.json';
let help : WebPackVNF = new WebPackVNF

const start = (next : Function) => {
    cli.exec("cd ./platforms/ios && rm -rf ./vnf3");
    return next();
}

const buildStatic = () => {
    help.buildRouterPageiOS(true);
    buildPage(help.listPage());
}

const buildPage = (data : Array<any>,key = 0) => {
    help.buildSinglePageiOS(data[key],false,() => {
        if(data.length === (key + 1)) {
            cli.ok("Completed ios build");
            return setupIndex();
        }
        buildPage(data,key + 1);
    })
}

const setupIndex = () => {
    cli.exec("cp -r ./platforms/ios/views/index.html ./platforms/ios/www/index.html",
    (resp : any) => {
        cli.info("Index ready " + resp.toString());
        BuildCache();
    },
    (resp : any) => {
        cli.ok(" Index ready " + resp.toString());
        BuildCache();
    });
}

const BuildCache = () => {
    const directoryPage = __dirname + '/../../../platforms/ios/www/';
        let data : Array<any>
        data = [];
        let list = fs.readdirSync(directoryPage);
        if (list.length < 1) {
            return data;
        }
        fs.writeFileSync("./platforms/ios/build.json",JSON.stringify(list));
        cli.ok("Completed build data ");
}
if (fs.existsSync(iOSAddframeworkInfoFile)) {
    start(() => {
        cli.exec("cd ./platforms/ios" 
        +  "&& git clone https://github.com/steveleetn91/vn-native-3-ios.git && cd ./vn-native-3-ios && git checkout beta && cd ../" 
        + " && cp -r ./vn-native-3-ios/vnf3 ./vnf3 && rm -rf ./vn-native-3-ios && cd ./vnf3",(resp : any) => {
            cli.info(resp.toString());
            buildStatic();
        },(resp : any) => {
            cli.info(resp.toString());
            buildStatic();
        });
    });  
}
