#!/usr/bin/env node
import * as cli from "cli";
const BuildiOSfs = require('fs');

let process = require("../../../config/config.json");
const createDMG = require('electron-installer-dmg');
const frameworkInfo = './framework.json';
let env: {
    ELECTRON_APP_TITLE: string,
    ELECTRON_APP_DESC: string,
    ELECTRON_APP_NAME: string,
    ELECTRON_APP_AUTHOR: string,
    ELECTRON_APP_VERSION: string,
    ELECTRON_BUILD: number
} = {
    ELECTRON_APP_TITLE: process.ELECTRON_APP_TITLE ? process.ELECTRON_APP_TITLE : "VNF3",
    ELECTRON_APP_DESC: process.ELECTRON_APP_TITLE ? process.ELECTRON_APP_TITLE : "Vn native framework version 3",
    ELECTRON_APP_NAME: process.ELECTRON_APP_NAME ? process.ELECTRON_APP_NAME : "App",
    ELECTRON_APP_AUTHOR: process.ELECTRON_APP_AUTHOR ? process.ELECTRON_APP_AUTHOR : "Steve lee",
    ELECTRON_APP_VERSION: process.ELECTRON_APP_VERSION ? process.ELECTRON_APP_VERSION : "1.0.0",
    ELECTRON_BUILD: process.ELECTRON_BUILD ? Number(process.ELECTRON_BUILD) : 0
}
try {
    if (BuildiOSfs.existsSync(frameworkInfo)) {

        const installerBuild: Function = async (): Promise<void> => {
            await createDMG({
                title: env.ELECTRON_APP_TITLE,
                description: env.ELECTRON_APP_DESC,
                appPath: './platforms/electron/dist/' + env.ELECTRON_APP_NAME + '-darwin-x64/' + env.ELECTRON_APP_NAME + '.app',
                out: './platforms/electron/dist/installer-' + env.ELECTRON_APP_NAME + '-darwin-x64',
                authors: env.ELECTRON_APP_AUTHOR,
                version: env.ELECTRON_APP_VERSION,
                name: env.ELECTRON_APP_NAME,
                overwrite: true,
                productName: env.ELECTRON_APP_NAME,
                icon: "./platforms/electron/icons/icon.icns"
            });
        }

        const osBuild: Function = (callback: Function): void => {
            cli.exec('npx electron-packager ./platforms/electron/app ' + env.ELECTRON_APP_NAME
                + ' --platform darwin --arch x64'
                + ' --out ./platforms/electron/dist --icon=./platforms/browser/www/icons/icon.icns --overwrite',
                async (resp: any): Promise<Function> => {
                    cli.ok(resp.toString());
                    await installerBuild();
                    return callback();
                }, async (err: any): Promise<Function> => {
                    cli.info(err.toString());
                    await installerBuild();
                    return callback();
                });
        }

        const makeStaticMacos : Function = (callback: Function) : void => {
            cli.exec("cp -r ./platforms/browser/www/* ./platforms/electron/app && cp -r ./bin/electron/views/index.ejs ./platforms/electron/app/index.html",(resp) : Function => {
                return callback()
            },(resp) : Function => {
                return callback();
            })
        }
        makeStaticMacos(() => {
            osBuild(() => {
                cli.ok("Done");
            });    
        })
    }
} catch (err) {
    cli.error(err.toString());
}