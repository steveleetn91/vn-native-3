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
const ip = require('ip');
const config = require("../../../config/config.json");
try {
    const setupDevelopmentIndex = async (callback: Function): Promise<Function> => {
        let developmentIndex: string = await AndroiDevelopmentfs.readFileSync('./bin/android/views/development.html',
            { encoding: 'utf8', flag: 'r' });
        await AndroiDevelopmentfs.writeFileSync("./platforms/android/app/src/main/assets/www/index.html", developmentIndex);
        return callback();
    }
    const setupDevelopmentConfigXml = async (): Promise<void> => {
        let configXml: string = await AndroiDevelopmentfs.readFileSync('./platforms/android/app/src/main/res/xml/config.xml',
            { encoding: 'utf8', flag: 'r' });
        configXml = configXml.replaceAll("index.html", `http://${ip.address()}:${config.PORT + 1}`);
        await AndroiDevelopmentfs.writeFileSync('./platforms/android/app/src/main/res/xml/config.xml', configXml);
        cli.ok("Please open Android Studio and run app");
    }
    const AndroidDevelopmentServe = (callback: Function): void => {

        /**
         * Server Listen change or add  
         */
        const reloadEvent: Function = (): void => {
            AndroidDevwatcher
                .on('add', (path: string): void => {
                    Androidio.emit('has reload', `Rebuild`);
                })
                .on('change', (path: string): void => {
                    Androidio.emit('has reload', `Rebuild`);
                })
        }
        /**
         * SV
         */

        Androidapp.set('view engine', 'ejs');
        Androidapp.use(express.static(`${__dirname}/../../../platforms/android/app/src/main/assets/www`));
        Androidapp.get('/', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../platforms/android/app/src/main/assets/www/index.html`);
        });
        Androidapp.get('/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../platforms/android/app/src/main/assets/www/index.html`);
        });
        Androidapp.get('/:slug/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../platforms/android/app/src/main/assets/www/index.html`);
        });
        Androidapp.get('/:slug/:slug/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../platforms/android/app/src/main/assets/www/index.html`);
        });
        Androidapp.get('/:slug/:slug/:slug/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../platforms/android/app/src/main/assets/www/index.html`);
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
        cli.exec("vn3-web-build && cp -r ./www/* ./platforms/android/app/src/main/assets/www",
            (resp: any): void => {
                cli.info(resp.toString());
                setupDevelopmentIndex(() => {
                    cli.ok("Completed prepare building Androis OS");
                    cli.info("Installed development");
                    AndroidDevelopmentServe(() => {
                        setupDevelopmentConfigXml();
                    });
                })
            },
            (resp: any): void => {
                cli.info(resp.toString());
                setupDevelopmentIndex(() => {
                    cli.ok("Completed prepare building Androis OS");
                    cli.info("Installed development");
                    AndroidDevelopmentServe(() => {
                        setupDevelopmentConfigXml();
                    });
                })
            });
    }
} catch (error) {
    cli.error(error.toString());
}