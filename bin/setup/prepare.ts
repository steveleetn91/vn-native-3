#!/usr/bin/env node 
import * as cli from "cli";
let fsPrepare : any = require("fs");
const BuildSetupframeworkInfo = './framework.json';
const firstBuild = () : void => {
    electronPrepare(() => {
        setupConstructionPlugin(() => {
            setupConstructionGlobal(() => {
                cli.ok("Done prepare construction");
            })    
        })
    });
}

const setupConstructionGlobal = (callback : Function) : void  => {
    cli.exec("cp -r .env.example .env && mkdir plugins",(resp) => {
        return callback()
    },(resp) => {
        return callback();
    });    
}

const setupConstructionPlugin = (callback : Function) : void => {
    cli.exec("rm -rf ./plugins",(resp) => {
        return callback();
    },(resp) => {
        return callback();
    })
}

const electronPrepare = (callback : Function) : void => {
    cli.exec("cp -r ./bin/electron/preload.ts ./platforms/electron/preload.ts",(resp) => {
        return callback();
    },(resp) => {
        return callback();
    });
}

if(fsPrepare.existsSync(BuildSetupframeworkInfo)) {
    firstBuild();
}


