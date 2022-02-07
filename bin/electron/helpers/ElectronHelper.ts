import ElectronInterfaceHelper from "./ElectronInterfaceHelper";
import * as cli from "cli";;
let configHelper = require('dotenv').config().parsed;
export default class ElectronHelper implements ElectronInterfaceHelper {
    checkFlagBuild(callback: Function): Function | void {
        let BuildiOS_ELECTRON_BUILD: number = configHelper.ELECTRON_BUILD && configHelper.ELECTRON_BUILD == 1 ? 1 : 0;
        if (BuildiOS_ELECTRON_BUILD == 0) {
            this.cli('error',"You need change ELECTRON_BUILD to 1 to build. And need ELECTRON_BUILD to 0 for development.")
            return;
        }
        return callback();
    }
    cli(type: string = "ok",message : string = ""): void {
        switch (type) {
            case "ok":
                cli.ok(message)
                break;
            case "error":
                cli.error(message)
                break;
            default:
                cli.info(message);
                break;
        }
        return;
    }
    makeShortcut(): void {
        if (require('electron-squirrel-startup')) return;
    }
}