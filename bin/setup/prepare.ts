#!/usr/bin/env node 
import * as cli from "cli";
let fsPrepare : any = require("fs");
const BuildSetupframeworkInfo = './framework.json';
const firstBuild = () => {
    electronPrepare(() => {
        cli.exec("npm run build && npm run build:web",(resp) => {
            cli.ok("Done prepare");
        },(resp) => {
            cli.ok("Done prepare");
        });    
    });
}
const electronPrepare = (callback : Function) => {
    cli.exec("cp -r ./bin/electron/preload.ts ./platforms/electron/preload.ts",(resp) => {
        return callback();
    },(resp) => {
        return callback();
    });
}

if(fsPrepare.existsSync(BuildSetupframeworkInfo)) {
    firstBuild();
}


