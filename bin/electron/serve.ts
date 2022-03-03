import * as express from "express";
import * as cli from "cli";;
import {createProxyMiddleware} from "http-proxy-middleware";
import { app, BrowserWindow } from 'electron';
const path = require('path');
let config = require('dotenv').config().parsed;
let ELECTRON_BUILD : number = config.ELECTRON_BUILD ? Number(config.ELECTRON_BUILD) : 0;
const myApp = express();
try {
    /**
     * If is development 
     */
    if (ELECTRON_BUILD == 0) {
        cli.exec(`vn3-web-development`, (resp : any) : void => {
            cli.info(resp.toString());
        }, (resp : any) => {
            cli.info(resp.toString());
        });
    }
    /**
     * Production serve
     */
    const PORT = 43000 + Number(Math.floor(Math.random() * 990));
    myApp.use(express.static(__dirname + '/../../../public'));
    myApp.set('views', __dirname + '/../../../public');
    myApp.set('view engine', 'ejs');
    myApp.use('/', createProxyMiddleware({ target: `http://localhost:${PORT}/?page=`, changeOrigin: true }));
    myApp.get('/', (req : Request, res : any) : void => {
        res.render('index');
    });
    myApp.get('/:slug', (req : Request, res : any) : void => {
        res.render('index');
    });
    myApp.get('/:slug/:slug', (req : Request, res : any) : void => {
        res.render('index');
    });
    myApp.get('/:slug/:slugg/:slug', (req : Request, res : any) : void => {
        res.render('index');
    });
    myApp.get('/:slug/:slugg/:slug/:slug', (req : Request, res : any) : void => {
        res.render('index');
    });
    myApp.listen(PORT);
    /**
     * App
     */
    app.whenReady().then(() : void => {
        createWindow()
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })

    const createWindow : Function = () : void => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            icon: "./platforms/electron/data-build/icon.png",
            autoHideMenuBar: true,
            webPreferences: {
                contextIsolation: true,
                preload:__dirname +"/../../platforms/electron/preload.js"
            }
        })
        if (ELECTRON_BUILD == 1) {
            win.loadURL(`http://localhost:${PORT}/`);
        } else {
            /**
             * For development
             */
            win.loadURL(`http://localhost:${config.PORT}/`);
            win.webContents.openDevTools();
        }
    }
    app.on('window-all-closed', () : void => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
} catch (err) {
    console.error(err.toString());
}
