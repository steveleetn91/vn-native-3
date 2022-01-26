#!/usr/bin/env node 
const cli = require('cli');
require('dotenv').config()
const help = require('../web/helpers/webpack.vnf');
const fs = require('fs');
const start = (next) => {
    cli.exec("cd ./platforms/ios && rm -rf ./vnf3");
    return next();
}

const buildStatic = () => {
    help.buildRouterPageiOS(true);
    buildPage(help.listPage());
}

const buildPage = (data,key = 0) => {
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
    (resp) => {
        cli.info("Index ready ",resp)
        BuildCache();
    },
    (resp) => {
        cli.ok(" Index ready ",resp);
        BuildCache();
    });
}

const BuildCache = () => {
    const directoryPage = __dirname + '/../../platforms/ios/www/';
        let data = [];
        let list = fs.readdirSync(directoryPage);
        if (list.length < 1) {
            return data;
        }
        fs.writeFileSync("./platforms/ios/build.json",JSON.stringify(list));
        cli.ok("Completed build data ");
}

start(() => {
    cli.exec("cd ./platforms/ios" 
    +  "&& git clone https://github.com/steveleetn91/vn-native-3-ios.git && cd ./vn-native-3-ios && git checkout beta && cd ../" 
    + " && cp -r ./vn-native-3-ios/vnf3 ./vnf3 && rm -rf ./vn-native-3-ios && cd ./vnf3",(resp) => {
        cli.info(resp.toString());
        buildStatic();
    },(resp) => {
        cli.info(resp.toString());
        buildStatic();
    });
});