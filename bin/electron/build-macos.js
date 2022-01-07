#!/usr/bin/env node
const fs = require('fs');
const cli = require('cli');
require('dotenv').config();
const createDMG = require('electron-installer-dmg');
const frameworkInfo = './framework.json';

try {
    if (fs.existsSync(frameworkInfo)) {
        if(process.env.ELECTRON_BUILD == 0 ) {
            cli.error("You need change ELECTRON_BUILD to 1 to build.");
            return;
        }
        const installerBuild = async () => {
            await createDMG({
                title: process.env.ELECTRON_APP_TITLE,
                description: process.env.ELECTRON_APP_DESC,
                appPath: './platforms/electron/dist/' + process.env.ELECTRON_APP_NAME + '-darwin-x64/' + process.env.ELECTRON_APP_NAME + '.app',
                out: './platforms/electron/dist/installer-' + process.env.ELECTRON_APP_NAME + '-darwin-x64',
                authors: process.env.ELECTRON_APP_AUTHOR,
                version: process.env.ELECTRON_APP_VERSION,
                name: process.env.ELECTRON_APP_NAME,
                overwrite: true,
                productName:process.env.ELECTRON_APP_NAME,
                icon : "./platforms/electron/data-build/icon.icns"
            });
        }

        const osBuild = (callback) => {
            cli.exec('npx electron-packager . ' + process.env.ELECTRON_APP_NAME
                + ' --platform darwin --arch x64'
                + ' --out ./platforms/electron/dist --icon=./platforms/electron/data-build/icon.icns --overwrite',
                async (resp) => {
                    cli.ok(resp.toString());
                    installerBuild();
                    return callback();
                }, async (err) => {
                    cli.info(err.toString());
                    installerBuild();
                    return callback();
                });
        }

        const restoreIndex = () => {
            cli.exec('cp -r ./platforms/web/views/development.ejs ./public/index.html', (res) => {
                cli.ok("Restore index", res.toString());
            });
        }

        cli.ok("Start electron build");
        cli.exec('cp -r ./platforms/web/views/production.ejs ./public/index.html', (resp) => {
            cli.ok("Setup index", resp.toString());
            osBuild(() => {
                restoreIndex();
            });
        });

    }
} catch (err) {
    cli.error(err.toString());
}