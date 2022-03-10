#!/usr/bin/env node 
import * as cli from "cli";
let fsPrepare : any = require("fs");
const BuildSetupframeworkInfo = './framework.json';
const firstBuild : Function = () : void => {
    setupConstructionGlobal(() => {
        cli.ok("Done prepare construction");
    })   
}

const setupConstructionGlobal : Function = (callback : Function) : void  => {
    cli.exec("npm i -g cordova && cp -r ./config/config.dev.json ./config/config.json && npm install --save-dev electron-packager",(resp) => {
        return callback()
    },(resp) => {
        return callback();
    });
    cli.exec("cp -r ./.env.example ./.env",(resp) => {},(resp) => {});    
}


if(fsPrepare.existsSync(BuildSetupframeworkInfo)) {
    firstBuild();
}


