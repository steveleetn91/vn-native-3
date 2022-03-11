import * as express from "express";
import * as cli from "cli";
import { app, BrowserWindow } from 'electron';
let config = require("../../../config/config.json");
require('dotenv').config()
try {

    cli.exec(`vn3-web-development`, (resp: any): void => {
        cli.info(resp.toString());
    }, (resp: any): void => {
        cli.info(resp.toString());
    });

    /**
     * App
     */
     app.whenReady().then((): void => {
        setTimeout(() => {
            createWindow()
            app.on('activate', () => {
                if (BrowserWindow.getAllWindows().length === 0) createWindow()
            })
        },2000);
    })
    const createWindow: Function = (): void => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            icon: "./platforms/browser/www/icons/icon.png",
            autoHideMenuBar: true,
            webPreferences: {
                contextIsolation: true,
                preload: __dirname + "/preload.js"
            }
        })

        win.loadURL(`http://localhost:${config.PORT}/`);
        if (config.ELECTRON_DEBUG_TOOL && config.ELECTRON_DEBUG_TOOL == 1) {

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
