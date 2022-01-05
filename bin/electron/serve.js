let express = require('express');
let myApp = express();
let cli = require('cli');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { app, BrowserWindow } = require('electron');
let path = require('path');
require('dotenv').config()

try {
    /**
     * If is development 
     */
    if(process.env.ELECTRON_BUILD == 0) {
        cli.exec(`vn3-web-serve`,(resp) => {
            cli.info(resp.toString());
        },(resp) => {
            cli.info(resp.toString());
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
            icon : "./platforms/electron/data-build/icon.png",
            autoHideMenuBar: true,
            webPreferences: {}
        })
        if(process.env.ELECTRON_BUILD == 1) {
            win.loadURL(`http://localhost:${PORT}/`);
        } else{
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
