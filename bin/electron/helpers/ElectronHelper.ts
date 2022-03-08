import ElectronInterfaceHelper from "./ElectronInterfaceHelper";
import * as cli from "cli";;
let configHelper = require("../../../../config/config.json");
export default class ElectronHelper implements ElectronInterfaceHelper {
    cli(type: string = "ok",message : string = ""): void {
        message === "" ? "Done" : message
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