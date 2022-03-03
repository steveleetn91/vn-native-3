#!/usr/bin/env node 
import * as cli from "cli";
let fs : any = require('fs');
let iOSBuildframeworkInfoFile : string = './framework.json';
const xcodeprojectBuild : Function = (next : Function ) : void => {
    cli.exec("cd ./platforms/ios && ruby ./prepare.rb && ruby ./build.rb",
    (info : any) : Function => {
        cli.info(info);
        return next();
    },(success : any) : Function => {
        cli.info(success.toString());
        return next();
    });
}

const copyStaticFile : Function = () : void => {
    cli.exec("cp -r ./platforms/ios/www/* ./platforms/ios/vnf3/vnf3/",() : void => {
        xcodeprojectBuild(() => {
            cli.ok("Please open project by xcode");
        });
    }, () => {
        xcodeprojectBuild(() : void => {
            cli.ok("Please open project by xcode");
        });
    })
}

const setupSwiftView : Function = () : void => {
    setTimeout(() : void => {
        cli.exec("cp -r ./platforms/ios/ViewController.production.swift ./platforms/ios/vnf3/vnf3/ViewController.swift",
        (resp : any) : void => {
            copyStaticFile();
        },() : void => {
            copyStaticFile();
        })
    },10000);
}
const WWW : Function = () : void => {
    cli.exec("cd platforms/ios && mkdir -p ./www && chmod -R 777 ./www",
    (info : any) : void => { 
        cli.info(info); 
        setupSwiftView();
    } ,(resp : any) : void => {
        setupSwiftView();
    })
}
if (fs.existsSync(iOSBuildframeworkInfoFile)) {
    WWW();
}
