#!/usr/bin/env node 
const cli = require('cli');
require('dotenv').config();
const fs = require('fs');
const ip = require('ip');
let ViewController = fs.readFileSync("./platforms/ios/ViewController.development.swift",{
    encoding:"utf-8"
});
cli.ok("Setup development serve");
ViewController = ViewController.replaceAll("{{development_serve}}","http://" + ip.address() + ':' + process.env.PORT);
fs.writeFileSync("./platforms/ios/vnf3/vnf3/ViewController.swift",ViewController);
cli.ok("Please start webserve, then open project by xcode, next select your device and run");
