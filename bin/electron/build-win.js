#!/usr/bin/env node
let fs = require('fs');
let cli = require('cli');
require('dotenv').config();
const electronInstaller = require('electron-winstaller');
const frameworkInfo = './framework.json';

try {
    if (fs.existsSync(frameworkInfo)) {

        let installerBuild = async (nameFolderBuild) => {
            try {
                await electronInstaller.createWindowsInstaller({
                    title:process.env.ELECTRON_APP_TITLE,
                    description:process.env.ELECTRON_APP_DESC,
                    appDirectory: './platforms/electron/dist/application-' + nameFolderBuild + '-win32-x64',
                    outputDirectory: './platforms/electron/dist/installer-' + nameFolderBuild,
                    authors: process.env.ELECTRON_APP_AUTHOR,
                    version:process.env.ELECTRON_APP_VERSION,
                    exe: 'application-' + nameFolderBuild +'.exe',
                    name:process.env.ELECTRON_APP_NAME
                });
                cli.ok("Done! Release happy ^^");
            }catch(err) {
                cli.error(err.toString());
            }
        }

        let osBuild = (nameFolderBuild,callback) => {
            cli.exec('npx electron-packager . application-' + nameFolderBuild
                + ' --platform win32 --arch x64' 
                + ' --out ./platforms/electron/dist --icon=./platforms/electron/data-build/icon.ico --overwrite', 
                async (resp) => {
                    cli.ok(resp.toString());
                    installerBuild(nameFolderBuild);
                    return callback();
                }, async (err) => {
                    cli.info(err.toString());
                    installerBuild(nameFolderBuild);
                    return callback();
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
            osBuild(nameFolderBuild,() => {
                restoreIndex();
            });
        });
        
    }
} catch (err) {
    cli.error(err.toString());
}