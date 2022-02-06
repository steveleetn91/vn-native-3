#!/usr/bin/env node

import ElectronHelper from "./helpers/ElectronHelper";
const BuildiOSfs = require('fs');
const BuildiOSCli = require('cli');
require('dotenv').config();
const createDMG = require('electron-installer-dmg');

let ElectronHelp : ElectronHelper = new ElectronHelper();
const frameworkInfo = './framework.json';
let BuildiOS_ELECTRON_BUILD : number;
let env : any;
BuildiOS_ELECTRON_BUILD = env.env.ELECTRON_BUILD && env.env.ELECTRON_BUILD == 0 ? 0 : 1;
try {
    if (BuildiOSfs.existsSync(frameworkInfo)) {
        
        const installerBuild = async () => {
            await createDMG({
                title: env.env.ELECTRON_APP_TITLE,
                description: env.env.ELECTRON_APP_DESC,
                appPath: './platforms/electron/dist/' + env.env.ELECTRON_APP_NAME + '-darwin-x64/' + env.env.ELECTRON_APP_NAME + '.app',
                out: './platforms/electron/dist/installer-' + env.env.ELECTRON_APP_NAME + '-darwin-x64',
                authors: env.env.ELECTRON_APP_AUTHOR,
                version: env.env.ELECTRON_APP_VERSION,
                name: env.env.ELECTRON_APP_NAME,
                overwrite: true,
                productName:env.env.ELECTRON_APP_NAME,
                icon : "./platforms/electron/data-build/icon.icns"
            });
        }

        const osBuild = (callback : Function) => {
            BuildiOSCli.exec('npx electron-packager . ' + env.env.ELECTRON_APP_NAME
                + ' --platform darwin --arch x64'
                + ' --out ./platforms/electron/dist --icon=./platforms/electron/data-build/icon.icns --overwrite',
                async (resp : any) => {
                    BuildiOSCli.ok(resp.toString());
                    await installerBuild();
                    return callback();
                }, async (err : any) => {
                    BuildiOSCli.info(err.toString());
                    await installerBuild();
                    return callback();
                });
        }

        const restoreIndex = () => {
            BuildiOSCli.exec('cp -r ./platforms/web/views/development.ejs ./public/index.html', (res : any) => {
                BuildiOSCli.ok("Restore index", res.toString());
            });
        }

        ElectronHelp.checkFlagBuild(() => {
            BuildiOSCli.ok("Start electron build");
            BuildiOSCli.exec('cp -r ./platforms/web/views/production.ejs ./public/index.html', (res : any) => {
                BuildiOSCli.ok("Setup index", res.toString());
                osBuild(() => {
                    restoreIndex();
                });
            });
        })
    }
} catch (err) {
    BuildiOSCli.error(err.toString());
}