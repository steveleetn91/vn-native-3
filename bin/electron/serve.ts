const express = require('express');
const myApp = express();
const ElectronServecli = require('cli');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { app, BrowserWindow } = require('electron');
const path = require('path');
require('dotenv').config()
let env : any = process.env;
let ELECTRON_BUILD : number = 0;
ELECTRON_BUILD = env.ELECTRON_BUILD == 0 ? 0 : 1;
try {
    /**
     * If is development 
     */
    if (ELECTRON_BUILD == 0) {
        ElectronServecli.exec(`vn3-web-serve`, (resp : any) => {
            ElectronServecli.info(resp.toString());
        }, (resp : any) => {
            ElectronServecli.info(resp.toString());
        });
    }
    /**
     * Production serve
     */
    const PORT = 43000 + Number(Math.floor(Math.random() * 990));
    myApp.use(express.static(path.join(__dirname, '../../public')));
    myApp.set('views', path.join(__dirname, '../../platforms/electron/views'));
    myApp.set('view engine', 'ejs');
    myApp.use('/', createProxyMiddleware({ target: `http://localhost:${PORT}/?page=`, changeOrigin: true }));
    myApp.get('/', (req : Request, res : any) => {
        res.render('index');
    });
    myApp.get('/:slug', (req : Request, res : any) => {
        res.render('index');
    });
    myApp.get('/:slug/:slug', (req : Request, res : any) => {
        res.render('index');
    });
    myApp.get('/:slug/:slugg/:slug', (req : Request, res : any) => {
        res.render('index');
    });
    myApp.get('/:slug/:slugg/:slug/:slug', (req : Request, res : any) => {
        res.render('index');
    });
    myApp.listen(PORT);
    /**
     * App
     */
    app.whenReady().then(() => {
        createWindow()
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })

    const createWindow = () => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            icon: "./platforms/electron/data-build/icon.png",
            autoHideMenuBar: true,
            webPreferences: {
                contextIsolation: true,
                preload:__dirname +"/preload.js"
            }
        })
        if (ELECTRON_BUILD == 1) {
            win.loadURL(`http://localhost:${PORT}/`);
        } else {
            /**
             * For development
             */
            win.loadURL(`http://localhost:${process.env.PORT}/`);
            win.webContents.openDevTools();
        }
    }
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
} catch (err) {
    console.error(err.toString());
}
