#!/usr/bin/env node
import * as cli from "cli";;
const Androidfs = require('fs');
const AndroidAddframeworkInfo = './framework.json';
try {
    if (Androidfs.existsSync(AndroidAddframeworkInfo)) {
        cli.exec("cordova platforms add android",
            (resp: any): void => {
                cli.info(resp.toString());
                cli.ok("Android OS really for development! ");
            }, (resp: any): void => {
                cli.info(resp.toString());
                cli.ok("Android OS really for development! ");
            });
    }
} catch (error) {
    cli.error(error.toString());
}