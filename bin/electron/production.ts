import * as express from "express";
import { app, BrowserWindow} from "electron";
const myApp = express();
try {
    if (require('electron-squirrel-startup')) {}
    const PORT = 43000 + Number(Math.floor(Math.random() * 990));
    myApp.use(express.static(__dirname + '/../../../platforms/browser/www'));
    myApp.set('views', __dirname + '/../../../bin/electron/views');
    myApp.set('view engine', 'ejs');
    myApp.get('/', (req : Request, res : any) : void => {
        res.render('index');
    });
    myApp.get('/:slug', (req : Request, res : any) : void => {
        res.render('index');
    });
    myApp.get('/:slug/:_slug', (req : Request, res : any) : void => {
        res.render('index');
    });
    myApp.get('/:slug/:_slug/:__slug', (req : Request, res : any) : void => {
        res.render('index');
    });
    myApp.get('/:slug/:_slug/:__slug/:___slug', (req : Request, res : any) : void => {
        res.render('index');
    });
    myApp.listen(PORT);
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
            autoHideMenuBar: true,
            icon: "./platforms/browser/www/icons/icon.png",
            webPreferences: {
                contextIsolation: true,
                preload:  __dirname +"/preload.js"
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