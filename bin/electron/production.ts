import ElectronHelper from "./helpers/ElectronHelper";

const express = require('express');
const myApp = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const { app, BrowserWindow} = require('electron');
const path = require('path');
require('dotenv').config()

let ElectronHelp : ElectronHelper= new ElectronHelper;

try {
    ElectronHelp.makeShortcut();
    const PORT = 43000 + Number(Math.floor(Math.random() * 990));
    myApp.use(express.static(__dirname + '/../../../public'));
    myApp.set('views', __dirname + '/../../../platforms/electron/views');
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
            autoHideMenuBar: true,
            webPreferences: {
                contextIsolation: true,
                preload:__dirname +"/preload.js"
            }
        })
        
        win.loadURL(`http://localhost:${PORT}/`);
    }
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
} catch (err) {
    console.error(err.toString());
}