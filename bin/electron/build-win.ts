#!/usr/bin/env node
import ElectronHelper from "./helpers/ElectronHelper";
const BuildWinfs = require('fs');
const BuildWincli = require('cli');
require('dotenv').config();
const electronInstaller = require('electron-winstaller');
const BuildWinframeworkInfo = './framework.json';
let ElectronHelp : ElectronHelper = new ElectronHelper;

try {
    if (BuildWinfs.existsSync(BuildWinframeworkInfo)) {
        const installerBuild = async (type : any) => {
            try {
                await electronInstaller.createWindowsInstaller({
                    title:process.env.ELECTRON_APP_TITLE,
                    description:process.env.ELECTRON_APP_DESC,
                    appDirectory: './platforms/electron/dist/' + process.env.ELECTRON_APP_NAME + '-win32-' + type,
                    outputDirectory: './platforms/electron/dist/installer-' + process.env.ELECTRON_APP_NAME  + '-win32-' + type,
                    authors: process.env.ELECTRON_APP_AUTHOR,
                    version:process.env.ELECTRON_APP_VERSION,
                    exe: process.env.ELECTRON_APP_NAME +'.exe',
                    name:process.env.ELECTRON_APP_NAME
                });
                ElectronHelp.cli("ok","Completed building ! "+type+" ^^");
            }catch(err) {
                ElectronHelp.cli("error",err.toString());
            }
        }

        const osBuild = (type : string,next : Function) => {
            BuildWincli.exec('npx electron-packager . ' + process.env.ELECTRON_APP_NAME
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
            BuildWincli.exec('cp -r ./platforms/web/views/development.ejs ./public/index.html', (res : any) => {
                ElectronHelp.cli("ok","Restore index" + res.toString());
            });
        }

        
        ElectronHelp.checkFlagBuild(() => {
            ElectronHelp.cli("ok","Start electron build");
            BuildWincli.exec('cp -r ./platforms/web/views/production.ejs ./public/index.html', (resp : any) => {
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