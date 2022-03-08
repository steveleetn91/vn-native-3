#!/usr/bin/env node 
import * as cli from "cli";
let fsPrepare : any = require("fs");
const BuildSetupProductionframeworkInfo = './framework.json';

if(fsPrepare.existsSync(BuildSetupProductionframeworkInfo)) {
    const setupProdConstructionGlobal : Function = (callback : Function) : void  => {
        cli.exec("cp -r ./config/config.prod.json ./config/config.json",(resp) => {
            return callback();
        },(resp) => {
            return callback();
        });    
    }
    setupProdConstructionGlobal(() => {
        cli.ok("You using production config!")
    });
}


