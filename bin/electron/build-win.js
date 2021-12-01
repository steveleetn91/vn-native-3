#!/usr/bin/env node
let fs = require('fs');
let cli = require('cli');
require('dotenv').config();
const electronInstaller = require('electron-winstaller');
const frameworkInfo = './framework.json';

try {
    if (fs.existsSync(frameworkInfo)) {

        let installerBuild = async (type) => {
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
                cli.ok("Done! "+type+" ^^");
            }catch(err) {
                cli.error(err.toString());
            }
        }

        let osBuild = (type,next) => {
            cli.exec('npx electron-packager . ' + process.env.ELECTRON_APP_NAME
                + ' --platform win32 --arch ' + type 
                + ' --out ./platforms/electron/dist --icon=./platforms/electron/data-build/icon.ico --overwrite', 
                async (resp) => {
                    cli.ok(resp.toString());
                    installerBuild(type);
                    return next();
                }, async (err) => {
                    cli.info(err.toString());
                    installerBuild(type);
                    return next();
                });
        }

        let restoreIndex = () => {
            cli.exec('cp -r ./platforms/web/views/development.html ./public/index.html', (res) => {
                cli.ok("Restore index", res.toString());
            });
        }

        cli.ok("Start electron build");
        cli.exec('cp -r ./platforms/web/views/production.html ./public/index.html', (resp) => {
            cli.ok("Setup index",resp.toString());
            const nameFolderBuild = (new Date()).getFullYear() +
            ((new Date()).getMonth() + 1)
            + (new Date()).getDate();
            osBuild('ia32',() => {
                osBuild('x64',() => {
                    osBuild('arm64',() => {
                        restoreIndex();
                    });
                });
            });
        });
        
    }
} catch (err) {
    cli.error(err.toString());
}