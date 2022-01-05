const express = require('express');
const myApp = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const { app, BrowserWindow } = require('electron');
const path = require('path');
require('dotenv').config()
if (require('electron-squirrel-startup')) return;
try {
    const PORT = 43000 + Number(Math.floor(Math.random() * 990));
    myApp.use(express.static(path.join(__dirname, '../../public')));
    myApp.set('views', path.join(__dirname, '../../platforms/electron/views'));
    myApp.set('view engine', 'ejs');
    myApp.use('/', createProxyMiddleware({ target: `http://localhost:${PORT}/?page=`, changeOrigin: true }));
    myApp.get('/', (req, res) => {
        res.render('index');
    });
    myApp.get('/:slug', (req, res) => {
        res.render('index');
    });
    myApp.get('/:slug/:slug', (req, res) => {
        res.render('index');
    });
    myApp.get('/:slug/:slugg/:slug', (req, res) => {
        res.render('index');
    });
    myApp.get('/:slug/:slugg/:slug/:slug', (req, res) => {
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
            autoHideMenuBar: true
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