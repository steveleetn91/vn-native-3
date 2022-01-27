#!/usr/bin/env node 
const cli = require('cli');
require('dotenv').config()
const xcodeprojectBuild = (next) => {
    cli.exec("cd ./platforms/ios && ruby ./prepare.rb && ruby ./build.rb",(info) => {
        cli.info(info);
        return next();
    },(success) => {
        cli.info(success);
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
        cli.exec("cp -r ./platforms/ios/ViewController.production.swift ./platforms/ios/vnf3/vnf3/ViewController.swift",(resp) => {
            copyStaticFile();
        },() => {
            copyStaticFile();
        })
    },10000);
}
const WWW = () => {
    cli.exec("cd platforms/ios && mkdir -p ./www && chmod -R 777 ./www",(info) => { 
        cli.info(info); 
        setupSwiftView();
    } ,(resp) => {
        setupSwiftView();
    })
}
WWW();