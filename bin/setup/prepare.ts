#!/usr/bin/env node 
import * as cli from "cli";
let fsPrepare : any = require("fs");
const BuildSetupframeworkInfo = './framework.json';
const firstBuild : Function = () : void => {
    electronPrepare(() => {
        setupConstructionPlugin(() => {
            setupConstructionGlobal(() => {
                cli.ok("Done prepare construction");
            })    
        })
    });
}

const setupConstructionGlobal : Function = (callback : Function) : void  => {
    cli.exec("cp -r .env.example .env && mkdir plugins",(resp) => {
        return callback()
    },(resp) => {
        return callback();
    });    
}

const setupConstructionPlugin : Function = (callback : Function) : void => {
    cli.exec("rm -rf ./plugins",(resp) : Function => {
        return callback();
    },(resp) : Function => {
        return callback();
    })
}

const electronPrepare : Function = (callback : Function) : void => {
    cli.exec("cp -r ./bin/electron/preload.ts ./platforms/electron/preload.ts",(resp) : Function => {
        return callback();
    },(resp) : Function => {
        return callback();
    });
}

if(fsPrepare.existsSync(BuildSetupframeworkInfo)) {
    firstBuild();
}


