#!/usr/bin/env node
import ElectronHelper from "./helpers/ElectronHelper";
import * as cli from "cli";
const BuildWinfs = require('fs');
let process = require("../../../config/config.json");
const electronInstaller = require('electron-winstaller');
const BuildWinframeworkInfo = './framework.json';
let ElectronHelp: ElectronHelper = new ElectronHelper;
let config: {
    ELECTRON_APP_TITLE: string,
    ELECTRON_APP_DESC: string,
    ELECTRON_APP_NAME: string,
    ELECTRON_APP_AUTHOR: string,
    ELECTRON_APP_VERSION: string
} = {
    ELECTRON_APP_TITLE: process && process.ELECTRON_APP_TITLE ? process.ELECTRON_APP_TITLE : "VNF3",
    ELECTRON_APP_DESC: process && process.ELECTRON_APP_TITLE ? process.ELECTRON_APP_TITLE : "Vn native framework version 3",
    ELECTRON_APP_NAME: process && process.ELECTRON_APP_NAME ? process.ELECTRON_APP_NAME : "App",
    ELECTRON_APP_AUTHOR: process && process.ELECTRON_APP_AUTHOR ? process.ELECTRON_APP_AUTHOR : "Steve lee",
    ELECTRON_APP_VERSION: process && process.ELECTRON_APP_VERSION ? process.ELECTRON_APP_VERSION : "1.0.0"
}
try {
    if (BuildWinfs.existsSync(BuildWinframeworkInfo)) {
        const installerBuild: Function = async (type: string): Promise<void> => {
            try {
                await electronInstaller.createWindowsInstaller({
                    title: config.ELECTRON_APP_TITLE,
                    description: config.ELECTRON_APP_DESC,
                    appDirectory: './platforms/electron/dist/' + config.ELECTRON_APP_NAME + '-win32-' + type,
                    outputDirectory: './platforms/electron/dist/installer-' + config.ELECTRON_APP_NAME + '-win32-' + type,
                    authors: config.ELECTRON_APP_AUTHOR,
                    version: config.ELECTRON_APP_VERSION,
                    exe: config.ELECTRON_APP_NAME + '.exe',
                    name: config.ELECTRON_APP_NAME
                });
                ElectronHelp.cli("ok", "Completed building ! " + type + " ^^");
            } catch (err) {
                ElectronHelp.cli("error", err.toString());
            }
        }

        const osBuild: Function = (type: string, next: Function): void => {
            cli.exec('npx electron-packager ./platforms/electron/app ' + config.ELECTRON_APP_NAME
                + ' --platform win32 --arch ' + type
                + ' --out ./platforms/electron/dist --icon=./platforms/browser/www/icons/icon.ico --overwrite --asar',
                async (resp: any) => {
                    ElectronHelp.cli("ok", resp.toString());
                    await installerBuild(type);
                    return next();
                }, async (err: any) => {
                    ElectronHelp.cli("info", err.toString());
                    await installerBuild(type);
                    return next();
                });
        }

        const makeStatic : Function = (callback: Function) : void => {
            cli.exec("cp -r ./platforms/browser/www/* ./platforms/electron/app && cp -r ./bin/electron/views/index.ejs ./platforms/electron/app/index.html",(resp) : Function => {
                return callback()
            },(resp) : Function => {
                return callback();
            })
        }
        makeStatic(() => {
            osBuild('ia32', () => {
                osBuild('x64', () => {
                    osBuild('arm64', () => {
                        ElectronHelp.cli("success", "Done");
                    });
                });
            });    
        })
        
    }
} catch (err) {
    ElectronHelp.cli("error", err.toString());
}