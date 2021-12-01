let express = require('express');
let myApp = express();
let cli = require('cli');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { app, BrowserWindow } = require('electron');
let path = require('path');
require('dotenv').config()

try {
    cli.exec('npx webpack watch --config webpack.config.dev.js',(resp) => {
        cli.info(resp.toString());
    })
    cli.exec('npx webpack watch --config ./bin/web/webpack.lazyload.js',(resp) => {
        cli.info(resp.toString());
    })
    const PORT = 43468;
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