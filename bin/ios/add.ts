#!/usr/bin/env node 
const iosAddcli = require('cli');
const help = require('../web/helpers/webpack.vnf');
const fs = require('fs');
const iOSAddframeworkInfoFile = './framework.json';


const start = (next : Function) => {
    iosAddcli.exec("cd ./platforms/ios && rm -rf ./vnf3");
    return next();
}

const buildStatic = () => {
    help.buildRouterPageiOS(true);
    buildPage(help.listPage());
}

const buildPage = (data : Array<any>,key = 0) => {
    help.buildSinglePageiOS(data[key],false,() => {
        if(data.length === (key + 1)) {
            iosAddcli.ok("Completed ios build");
            return setupIndex();
        }
        buildPage(data,key + 1);
    })
}

const setupIndex = () => {
    iosAddcli.exec("cp -r ./platforms/ios/views/index.html ./platforms/ios/www/index.html",
    (resp : any) => {
        iosAddcli.info("Index ready ",resp)
        BuildCache();
    },
    (resp : any) => {
        iosAddcli.ok(" Index ready ",resp);
        BuildCache();
    });
}

const BuildCache = () => {
    const directoryPage = __dirname + '/../../platforms/ios/www/';
        let data : Array<any>
        data = [];
        let list = fs.readdirSync(directoryPage);
        if (list.length < 1) {
            return data;
        }
        fs.writeFileSync("./platforms/ios/build.json",JSON.stringify(list));
        iosAddcli.ok("Completed build data ");
}
if (fs.existsSync(iOSAddframeworkInfoFile)) {
    start(() => {
        iosAddcli.exec("cd ./platforms/ios" 
        +  "&& git clone https://github.com/steveleetn91/vn-native-3-ios.git && cd ./vn-native-3-ios && git checkout beta && cd ../" 
        + " && cp -r ./vn-native-3-ios/vnf3 ./vnf3 && rm -rf ./vn-native-3-ios && cd ./vnf3",(resp : any) => {
            iosAddcli.info(resp.toString());
            buildStatic();
        },(resp : any) => {
            iosAddcli.info(resp.toString());
            buildStatic();
        });
    });  
}
