import * as express from "express";
import * as cli from "cli";;
import { createProxyMiddleware } from "http-proxy-middleware";
import { app, BrowserWindow } from 'electron';
const path = require('path');
let config = require("../../../config/config.json");
const myApp = express();
require('dotenv').config()
try {
    cli.exec(`vn3-web-development`, (resp: any): void => {
        cli.info(resp.toString());
    }, (resp: any) => {
        cli.info(resp.toString());
    });
    /**
     * App
     */
    app.whenReady().then((): void => {
        createWindow()
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })

    const createWindow: Function = (): void => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            icon: "./platforms/electron/data-build/icon.png",
            autoHideMenuBar: true,
            webPreferences: {
                contextIsolation: true,
                preload: __dirname + "/../../platforms/electron/preload.js"
            }
        })
        
        win.loadURL(`http://localhost:${config.PORT}/`);
        if(config.ELECTRON_DEBUG_TOOL && config.ELECTRON_DEBUG_TOOL == 1 ) {
            
            win.webContents.openDevTools();
        }
    }
    app.on('window-all-closed', (): void => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
} catch (err) {
    console.error(err.toString());
}
