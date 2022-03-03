#!/usr/bin/env node
import ElectronHelper from "./helpers/ElectronHelper";
import * as cli from "cli";
const PrepareBuildSoftwarefs = require('fs');
const PrepareBuildSoftwareframeworkInfo = './framework.json';
try {
    if (PrepareBuildSoftwarefs.existsSync(PrepareBuildSoftwareframeworkInfo)) {
        const prepareCoreFile : Function = () : void => {
            cli.exec(`cp -r ./bin/electron/preload.ts ./platforms/electron/preload.ts`,(resp) : Function => {
                return reBuildPlugin()
            },(resp) : Function => {
                return reBuildPlugin()
            })
        }
        const reBuildPlugin : Function = () : void => {
            cli.exec(`vnnative3-plugin-reinstall`,(resp) : void => {
                cli.info(resp.toString());
            },(resp) : void => {
                cli.info(resp.toString());
            });
        }
        prepareCoreFile();
    }
}catch(e) {
    cli.error(e.toString());
}