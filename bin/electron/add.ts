#!/usr/bin/env node
import * as cli from "cli";
const ElectronAddFs = require('fs');
const ElectgronAddframeworkInfo = './framework.json';
try {
    if (ElectronAddFs.existsSync(ElectgronAddframeworkInfo)) {
        const ElectronPrepareAdd : Function = (callback : Function) => {
            cli.exec("cd platforms && mkdir electron && cd ./electron && git clone https://github.com/steveleetn91/vnnative3-software.git app",(resp) : Function => {
                cli.info(resp.toString());
                return callback()
            },(resp) : Function => {
                cli.info(resp.toString());
                return callback()
            })
        }
        const ElectronSetupAdd : Function = () => {
            cli.exec("cd ./platforms/electron/app && rm -rf ./.git && npm install && npm run build",(resp) : void => {
                cli.info(resp.toString());
                cli.ok("Done");
            },(resp) : void => {
                cli.info(resp.toString());
                cli.ok("Done");
            })
        }
        const ElectronMakePreloadAdd : Function = () => {
            cli.exec("cp -r ./bin/electron/preload.ts ./platforms/electron/app/preload.ts",(resp) : void => {
                cli.info(resp.toString());
            },(resp) : void => {
                cli.info(resp.toString());
            })
        }
        ElectronPrepareAdd(() => {
            ElectronMakePreloadAdd();
            ElectronSetupAdd();
        });
    }
}catch(error) {
    cli.error(error.toString());
}