#!/usr/bin/env node 
import * as cli from "cli";;
let iOSConfig = require("../../../config/config.json");
let fs : any = require('fs');
const iosServeIp = require('ip');
let iOSServeframeworkInfoFile : string = './framework.json';
const PORT = iOSConfig.PORT ? iOSConfig.PORT : 9000;
if (fs.existsSync(iOSServeframeworkInfoFile)) {
    let ViewController = fs.readFileSync("./platforms/ios/ViewController.development.swift",{
        encoding:"utf-8"
    });
    cli.ok("Setup development serve");
    ViewController = ViewController.replaceAll("{{development_serve}}","http://" + iosServeIp.address() + ':' + PORT);
    fs.writeFileSync("./platforms/ios/vnf3/vnf3/ViewController.swift",ViewController);
    cli.ok("Please start webserve, then open project by xcode, next select your device and run");
}