#!/usr/bin/env node
const cli = require('cli');
const fs = require('fs')
const frameworkInfo = './framework.json'
const webHelper = require('./helpers/webpack.vnf');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config()
const chokidar = require('chokidar');
const watcher = chokidar.watch(__dirname + "/../../pages", { ignored: /^\./, persistent: true });
const _path = require('path');
try {

    if (fs.existsSync(frameworkInfo)) {
        const listPageNeedBuild = webHelper.listPage();
        webHelper.buildRouterPage();
        const myServe = () => {
            app.set('view engine', 'ejs');
            app.use(express.static(`${__dirname}/../../public`));
            app.get('/', (req, res) => {
                res.render(`${__dirname}/../../public/index.html`);
            });
            app.get('/:slug', (req, res) => {
                res.render(`${__dirname}/../../platforms/web/views/development.ejs`);
            });
            app.get('/:slug/:slug', (req, res) => {
                res.render(`${__dirname}/../../platforms/web/views/development.ejs`);
            });
            app.get('/:slug/:slug/:slug', (req, res) => {
                res.render(`${__dirname}/../../platforms/web/views/development.ejs`);
            });
            app.get('/:slug/:slug/:slug/:slug', (req, res) => {
                res.render(`${__dirname}/../../platforms/web/views/development.ejs`);
            });
            io.on('connection', (socket) => {
                socket.on('has reload', msg => {
                    cli.info("Has update");
                });
            });
            http.listen(process.env.PORT, () => {
                cli.ok(`Server running at http://localhost:${process.env.PORT}/`);
            });
        }
        /**
         * Server Listen change or add  
         */
        const reloadEvent = () => {
            watcher
                .on('add', (path) => {
                    cli.ok(`Added ${path}`)
                })
                .on('change', (path) => {
                    if (path.includes('.ts')) {
                        path = path.replace(_path.join(__dirname + "/../../pages"), '').replace('.ts', '');
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
        /**
         * INIT 
         */
         const robotLoadPage = (listPageNeedBuild,key = 0) => {
            webHelper.buildSinglePage(listPageNeedBuild[key], true,() => {
                if((key + 1) < listPageNeedBuild.length) {
                    robotLoadPage(listPageNeedBuild,key);
                } else if ((key + 1) == listPageNeedBuild.length) {
                    myServe();
                    reloadEvent();
                }
            });
        }
        robotLoadPage(listPageNeedBuild,0);
    }
} catch (err) {
    cli.error(err.toString());
} 