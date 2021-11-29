#!/usr/bin/env node
let fs = require('fs');
let cli = require('cli');
require('dotenv').config();
const frameworkInfo = './framework.json';
const nameFolderBuild = (new Date()).getFullYear() + '-' +  
( (new Date()).getMonth() + 1 )
+ '-' + (new Date()).getDate();
try {
    if (fs.existsSync(frameworkInfo)) {
        cli.ok("Start electron build");
        cli.exec('cp -r ./platforms/web/views/production.html ./public/index.html', (resp) => {
            cli.ok("Setup index");
        });
        cli.exec('npx electron-packager . application-' + nameFolderBuild 
        + ' --platform win32 --arch x64 --out ./platforms/electron/dist --icon=./platforms/electron/data-build/icon.ico --overwrite', (resp) => {
            cli.ok(resp.toString());
        },err => console.error(err));
        cli.exec('cp -r ./platforms/web/views/development.html ./public/index.html', (res) => {
            cli.ok("Restore index",res.toString());
        });
    }
} catch (err) {
    cli.error(err.toString());
}