#!/usr/bin/env node 
import * as cli from "cli";
import * as express from "express";
let iOSSvapp = express();
const iOSSvHttp = require('http').Server(iOSSvapp);
const iOSSvio = require('socket.io')(iOSSvHttp);
const iOSSvevelopmentfs = require('fs');
const iOSSvevelopmentframeworkInfo = './framework.json';
const iOSSvDevchokidar = require('chokidar');
const iOSSvDevwatcher = iOSSvDevchokidar.watch(__dirname + "/../../../platforms/ios/www", { ignored: /^\./, persistent: true });
const config = require("../../../config/config.json");
const ioSIPServe = require("ip");
if (iOSSvevelopmentfs.existsSync(iOSSvevelopmentframeworkInfo)) {
    const iosServe : Function = (callback : Function = () => {}) => {
        /**
         * Server Listen change or add  
         */
         const reloadEvent: Function = (): void => {
            iOSSvDevwatcher
                .on('add', (path: string): void => {
                    cli.info("add " + path.toString());
                    iOSSvio.emit('has reload', `Rebuild`);
                })
                .on('change', (path: string): void => {
                    cli.info("change " + path.toString());
                    iOSSvio.emit('has reload', `Rebuild`);
                })
        }
        /**
         * SV
         */

         iOSSvapp.set('view engine', 'ejs');
         iOSSvapp.use(express.static(`${__dirname}/../../../platforms/ios/www`));
         iOSSvapp.get('/', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../bin/ios/views/development`);
        });
        iOSSvapp.get('/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../bin/ios/views/development`);
        });
        iOSSvapp.get('/:slug/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../bin/ios/views/development`);
        });
        iOSSvapp.get('/:slug/:slug/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../bin/ios/views/development`);
        });
        iOSSvapp.get('/:slug/:slug/:slug/:slug', (req: any, res: any): void => {
            res.render(`${__dirname}/../../../bin/ios/views/development`);
        });
        iOSSvio.on('connection', (socket: any): void => {
            socket.on('has reload', (msg: string) => {
                cli.info("Has update");
            });
        });
        iOSSvHttp.listen(Number(config.PORT) + 2, (): void => {
            cli.ok(`Server running at http://localhost:${Number(config.PORT) + 2}/`);
            callback();
            reloadEvent();
        });
    }

    
    iosServe(() => {
        // do a something
    })
}