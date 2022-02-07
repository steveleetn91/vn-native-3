#!/usr/bin/env node
import * as cli from "cli";;
import WebPackVNF from "./helpers/webpack.vnf";
import * as express from "express";
const serveFs = require('fs')
let configWebServe = require('dotenv').config().parsed;
const chokidar = require('chokidar');
const watcher = chokidar.watch(__dirname + "/../../../pages", { ignored: /^\./, persistent: true });
const _path = require('path');
let frameworkInfo : string;
frameworkInfo = './framework.json';
const servePort : Number = configWebServe.PORT ? Number(configWebServe.PORT) : 3000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

try {
    let webHelper : WebPackVNF;
    webHelper = new WebPackVNF();
    if (serveFs.existsSync(frameworkInfo)) {
        webHelper.buildRouterPage();
        const myServe = () => {
            app.set('view engine', 'ejs');
            app.use(express.static(`${__dirname}/../../../public`));
            app.get('/', (req : any, res : any) => {
                res.render(`${__dirname}/../../../public/index.html`);
            });
            app.get('/:slug', (req : any, res : any) => {
                res.render(`${__dirname}/../../../platforms/web/views/development.ejs`);
            });
            app.get('/:slug/:slug', (req : any, res : any) => {
                res.render(`${__dirname}/../../../platforms/web/views/development.ejs`);
            });
            app.get('/:slug/:slug/:slug', (req : any, res : any) => {
                res.render(`${__dirname}/../../../platforms/web/views/development.ejs`);
            });
            app.get('/:slug/:slug/:slug/:slug', (req : any, res : any) => {
                res.render(`${__dirname}/../../../platforms/web/views/development.ejs`);
            });
            io.on('connection', (socket : any) => {
                socket.on('has reload', (msg : string) => {
                    cli.info("Has update");
                });
            });
            http.listen(servePort, () => {
                cli.ok(`Server running at http://localhost:${servePort}/`);
            });
        }
        /**
         * Server Listen change or add  
         */
        const reloadEvent = () => {
            watcher
                .on('add', (path : string) => {
                    cli.ok(`Added ${path}`)
                })
                .on('change', (path : string) => {
                    cli.info("Changed " + path.toString());
                    if (path.includes('.ts') || path.includes('.scss') || path.includes('.html')) {
                        path = path.replace(_path.join(__dirname,"/../../../pages"), '')
                            .replace('.Interface.ts', '')
                            .replace('.Service.ts', '')
                            .replace('.ts', '')
                            .replace('.scss', '')
                            .replace('.html', '');
                        console.log('test',path);    
                        const totalString = path.split('');
                        let name = '';
                        for (let i = 1; i < (totalString.length / 2); i++) {
                            name += totalString[i];
                            if ((i + 1) === (totalString.length / 2)) {
                                webHelper.buildSinglePage(name, true, () => {
                                    io.emit('has reload', `Rebuild ${name}`);
                                    cli.ok(`Rebuild ${name}`)
                                });
                            }
                        }
                    }
                })
        }
        myServe();
        reloadEvent();
    }
} catch (err) {
    cli.error(err.toString());
} 