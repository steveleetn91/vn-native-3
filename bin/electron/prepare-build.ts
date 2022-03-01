#!/usr/bin/env node
import ElectronHelper from "./helpers/ElectronHelper";
import * as cli from "cli";
const PrepareBuildSoftwarefs = require('fs');
const PrepareBuildSoftwareframeworkInfo = './framework.json';
try {
    if (PrepareBuildSoftwarefs.existsSync(PrepareBuildSoftwareframeworkInfo)) {
        const prepareCoreFile = () : void => {
            cli.exec(`cp -r ./bin/electron/preload.ts ./platforms/electron/preload.ts`,(resp) => {
                reBuildPlugin()
            },(resp) => {
                reBuildPlugin()
            })
        }
        const reBuildPlugin = () : void => {
            cli.exec(`vnnative3-plugin-reinstall`,(resp) => {
                cli.info(resp.toString());
            },(resp) => {
                cli.info(resp.toString());
            });
        }
        prepareCoreFile();
    }
}catch(e) {
    cli.error(e.toString());
}