#!/usr/bin/env node
import * as cli from "cli";;
import ElectronHelper from "./helpers/ElectronHelper";
const BuildiOSfs = require('fs');

let process = require('dotenv').config();
const createDMG = require('electron-installer-dmg');
let ElectronHelp : ElectronHelper = new ElectronHelper();
const frameworkInfo = './framework.json';
let env : {
    ELECTRON_APP_TITLE : string,
    ELECTRON_APP_DESC : string,
    ELECTRON_APP_NAME : string,
    ELECTRON_APP_AUTHOR : string,
    ELECTRON_APP_VERSION : string,
    ELECTRON_BUILD : number
} = {
    ELECTRON_APP_TITLE : process.parsed.ELECTRON_APP_TITLE ? process.parsed.ELECTRON_APP_TITLE : "VNF3",
    ELECTRON_APP_DESC : process.parsed.ELECTRON_APP_TITLE ? process.parsed.ELECTRON_APP_TITLE : "Vn native framework version 3",
    ELECTRON_APP_NAME : process.parsed.ELECTRON_APP_NAME ? process.parsed.ELECTRON_APP_NAME : "App",
    ELECTRON_APP_AUTHOR : process.parsed.ELECTRON_APP_AUTHOR ? process.parsed.ELECTRON_APP_AUTHOR : "Steve lee",
    ELECTRON_APP_VERSION : process.parsed.ELECTRON_APP_VERSION ? process.parsed.ELECTRON_APP_VERSION : "1.0.0",
    ELECTRON_BUILD : process.parsed.ELECTRON_BUILD ? Number(process.parsed.ELECTRON_BUILD) : 0
}
try {
    if (BuildiOSfs.existsSync(frameworkInfo)) {
        
        const installerBuild = async () => {
            await createDMG({
                title: env.ELECTRON_APP_TITLE,
                description: env.ELECTRON_APP_DESC,
                appPath: './platforms/electron/dist/' + env.ELECTRON_APP_NAME + '-darwin-x64/' + env.ELECTRON_APP_NAME + '.app',
                out: './platforms/electron/dist/installer-' + env.ELECTRON_APP_NAME + '-darwin-x64',
                authors: env.ELECTRON_APP_AUTHOR,
                version: env.ELECTRON_APP_VERSION,
                name: env.ELECTRON_APP_NAME,
                overwrite: true,
                productName:env.ELECTRON_APP_NAME,
                icon : "./platforms/electron/data-build/icon.icns"
            });
        }

        const osBuild = (callback : Function) => {
            cli.exec('npx electron-packager . ' + env.ELECTRON_APP_NAME
                + ' --platform darwin --arch x64'
                + ' --out ./platforms/electron/dist --icon=./platforms/electron/data-build/icon.icns --overwrite',
                async (resp : any) => {
                    cli.ok(resp.toString());
                    await installerBuild();
                    return callback();
                }, async (err : any) => {
                    cli.info(err.toString());
                    await installerBuild();
                    return callback();
                });
        }

        const restoreIndex = () => {
            cli.exec('cp -r ./platforms/web/views/development.ejs ./public/index.html', (res : any) => {
                cli.ok("Restore index" + res.toString());
            });
        }

        ElectronHelp.checkFlagBuild(() => {
            cli.ok("Start electron build");
            cli.exec('cp -r ./platforms/web/views/production.ejs ./public/index.html', (res : any) => {
                cli.ok("Setup index" + res.toString());
                osBuild(() => {
                    restoreIndex();
                });
            });
        })
    }
} catch (err) {
    cli.error(err.toString());
}