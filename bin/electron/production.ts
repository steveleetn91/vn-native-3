import * as express from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import { app, BrowserWindow} from "electron";
const myApp = express();
try {
    if (require('electron-squirrel-startup')) {}
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
    myApp.get('/:slug/:_slug', (req : Request, res : any) => {
        res.render('index');
    });
    myApp.get('/:slug/:_slug/:__slug', (req : Request, res : any) => {
        res.render('index');
    });
    myApp.get('/:slug/:_slug/:__slug/:___slug', (req : Request, res : any) => {
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