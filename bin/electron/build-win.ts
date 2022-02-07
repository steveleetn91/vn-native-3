#!/usr/bin/env node
import ElectronHelper from "./helpers/ElectronHelper";
import * as cli from "cli";;
const BuildWinfs = require('fs');
let process = require('dotenv').config();
const electronInstaller = require('electron-winstaller');
const BuildWinframeworkInfo = './framework.json';
let ElectronHelp : ElectronHelper = new ElectronHelper;
let config : {
    ELECTRON_APP_TITLE : string,
    ELECTRON_APP_DESC : string,
    ELECTRON_APP_NAME : string,
    ELECTRON_APP_AUTHOR : string,
    ELECTRON_APP_VERSION : string
} = {
    ELECTRON_APP_TITLE : process.parsed && process.parsed.ELECTRON_APP_TITLE ? process.parsed.ELECTRON_APP_TITLE : "VNF3",
    ELECTRON_APP_DESC : process.parsed && process.parsed.ELECTRON_APP_TITLE ? process.parsed.ELECTRON_APP_TITLE : "Vn native framework version 3",
    ELECTRON_APP_NAME : process.parsed && process.parsed.ELECTRON_APP_NAME ? process.parsed.ELECTRON_APP_NAME : "App",
    ELECTRON_APP_AUTHOR : process.parsed && process.parsed.ELECTRON_APP_AUTHOR ? process.parsed.ELECTRON_APP_AUTHOR : "Steve lee",
    ELECTRON_APP_VERSION : process.parsed && process.parsed.ELECTRON_APP_VERSION ? process.parsed.ELECTRON_APP_VERSION : "1.0.0"
}
try {
    if (BuildWinfs.existsSync(BuildWinframeworkInfo)) {
        const installerBuild = async (type : string) => {
            try {
                await electronInstaller.createWindowsInstaller({
                    title: config.ELECTRON_APP_TITLE,
                    description: config.ELECTRON_APP_DESC,
                    appDirectory: './platforms/electron/dist/' + config.ELECTRON_APP_NAME + '-win32-' + type,
                    outputDirectory: './platforms/electron/dist/installer-' + config.ELECTRON_APP_NAME  + '-win32-' + type,
                    authors: config.ELECTRON_APP_AUTHOR,
                    version: config.ELECTRON_APP_VERSION,
                    exe: config.ELECTRON_APP_NAME +'.exe',
                    name: config.ELECTRON_APP_NAME
                });
                ElectronHelp.cli("ok","Completed building ! "+type+" ^^");
            }catch(err) {
                ElectronHelp.cli("error",err.toString());
            }
        }

        const osBuild = (type : string,next : Function) => {
            cli.exec('npx electron-packager . ' + config.ELECTRON_APP_NAME
                + ' --platform win32 --arch ' + type 
                + ' --out ./platforms/electron/dist --icon=./platforms/electron/data-build/icon.ico --overwrite', 
                async (resp : any) => {
                    ElectronHelp.cli("ok",resp.toString());
                    await installerBuild(type);
                    return next();
                }, async (err : any) => {
                    ElectronHelp.cli("info",err.toString());
                    await installerBuild(type);
                    return next();
                });
        }

        const restoreIndex = () => {
            cli.exec('cp -r ./platforms/web/views/development.ejs ./public/index.html', (res : any) => {
                ElectronHelp.cli("ok","Restore index" + res.toString());
            });
        }
        
        ElectronHelp.checkFlagBuild(() => {
            ElectronHelp.cli("ok","Start electron build");
            cli.exec('cp -r ./platforms/web/views/production.ejs ./public/index.html', (resp : any) => {
                ElectronHelp.cli("ok","Setup index " + resp.toString());
                osBuild('ia32',() => {
                    osBuild('x64',() => {
                        osBuild('arm64',() => {
                            restoreIndex();
                        });
                    });
                });
            }); 
        })
    }
} catch (err) {
    ElectronHelp.cli("error",err.toString());
}