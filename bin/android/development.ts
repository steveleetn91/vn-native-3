#!/usr/bin/env node
import * as cli from "cli";
import * as express from "express";
let Androidapp = express();
const AndroidHttp = require('http').Server(Androidapp);
const Androidio = require('socket.io')(AndroidHttp);
const AndroiDevelopmentfs = require('fs');
const AndroiDevelopmentframeworkInfo = './framework.json';
const AndroiDevelopmentAndroidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
const AndroidDevchokidar = require('chokidar');
const AndroidDevwatcher = AndroidDevchokidar.watch(__dirname + "/../../../platforms/android/app/src/main/assets/www", { ignored: /^\./, persistent: true });
const config = require("../../../config/config.json");
try {
    const AndroidDevelopmentServe = (callback: Function): void => {

        /**
         * Server Listen change or add  
         */
        const reloadEvent: Function = (): void => {
            AndroidDevwatcher
                .on('add', (path: string): void => {
                    setTimeout(() => {
                        Androidio.emit('has reload', `Rebuild`);
                    },2000);
                })
                .on('change', (path: string): void => {
                    setTimeout(() => {
                        Androidio.emit('has reload', `Rebuild`);
                    },2000);
                })
        }
        /**
         * SV
         */

        Androidapp.set('view engine', 'ejs');
        Androidapp.use(express.static(`${__dirname}/../../../platforms/android/app/src/main/assets/www`));
        Androidapp.get('/', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../bin/android/views/development`);
        });
        Androidapp.get('/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../bin/android/views/development`);
        });
        Androidapp.get('/:slug/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../bin/android/views/development`);
        });
        Androidapp.get('/:slug/:slug/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../bin/android/views/development`);
        });
        Androidapp.get('/:slug/:slug/:slug/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../bin/android/views/development`);
        });
        Androidio.on('connection', (socket: any): void => {
            socket.on('has reload', (msg: string) => {
                cli.info("Has update");
            });
        });
        AndroidHttp.listen(Number(config.PORT) + 1, (): void => {
            cli.ok(`Server running at http://localhost:${Number(config.PORT) + 1}/`);
            callback();
            reloadEvent();
        });

    }
    if (AndroiDevelopmentfs.existsSync(AndroiDevelopmentframeworkInfo) && AndroiDevelopmentfs.existsSync(AndroiDevelopmentAndroidConfig)) {
        cli.exec("vn3-web-build && cp -r ./www/* ./platforms/android/app/src/main/assets/www && rm -rf ./platforms/android/app/src/main/assets/www/index.html",
            (resp: any): void => {
                cli.info(resp.toString());
                cli.ok("Completed prepare building Androis OS");
                cli.info("Installed development");
                AndroidDevelopmentServe(() => {
                    cli.ok("Please run app by Android Studio")
                });
            },
            (resp: any): void => {
                cli.info(resp.toString());
                cli.ok("Completed prepare building Androis OS");
                cli.info("Installed development");
                AndroidDevelopmentServe(() => {
                    cli.ok("Please run app by Android Studio")
                });
            });
    }
} catch (error) {
    cli.error(error.toString());
}