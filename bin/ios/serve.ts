#!/usr/bin/env node 
const iosServeCli = require('cli');
let iOSConfig = require('dotenv').config().parsed;
const iosServefs = require('fs');
const iosServeIp = require('ip');
const iOSServeframeworkInfoFile = './framework.json';
const PORT = iOSConfig.PORT ? iOSConfig.PORT : 3000;
if (fs.existsSync(iOSServeframeworkInfoFile)) {
    let ViewController = iosServefs.readFileSync("./platforms/ios/ViewController.development.swift",{
        encoding:"utf-8"
    });
    iosServeCli.ok("Setup development serve");
    ViewController = ViewController.replaceAll("{{development_serve}}","http://" + iosServeIp.address() + ':' + PORT);
    iosServefs.writeFileSync("./platforms/ios/vnf3/vnf3/ViewController.swift",ViewController);
    iosServeCli.ok("Please start webserve, then open project by xcode, next select your device and run");
}