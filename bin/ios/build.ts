#!/usr/bin/env node 
import * as cli from "cli";
let fs : any = require('fs');
let iOSBuildframeworkInfoFile : string = './framework.json';
const xcodeprojectBuild = (next : Function ) => {
    cli.exec("cd ./platforms/ios && ruby ./prepare.rb && ruby ./build.rb",(info : any) => {
        cli.info(info);
        return next();
    },(success : any) => {
        cli.info(success.toString());
        return next();
    });
}

const copyStaticFile = () => {
    cli.exec("cp -r ./platforms/ios/www/* ./platforms/ios/vnf3/vnf3/",() => {
        xcodeprojectBuild(() => {
            cli.ok("Please open project by xcode");
        });
    }, () => {
        xcodeprojectBuild(() => {
            cli.ok("Please open project by xcode");
        });
    })
}

const setupSwiftView = () => {
    setTimeout(() => {
        cli.exec("cp -r ./platforms/ios/ViewController.production.swift ./platforms/ios/vnf3/vnf3/ViewController.swift",(resp : any) => {
            copyStaticFile();
        },() => {
            copyStaticFile();
        })
    },10000);
}
const WWW = () => {
    cli.exec("cd platforms/ios && mkdir -p ./www && chmod -R 777 ./www",(info : any) => { 
        cli.info(info); 
        setupSwiftView();
    } ,(resp : any) => {
        setupSwiftView();
    })
}
if (fs.existsSync(iOSBuildframeworkInfoFile)) {
    WWW();
}
