#!/usr/bin/env node
import * as cli from "cli";;
const Androidfs = require('fs');
const AndroidAddframeworkInfo = './framework.json';
try {
    const prepare : Function = (next : Function) : void => {
        cli.exec("cd ./platforms && rm -rf ./android && mkdir android",(resp : any) : Function => {
            return next();
        },
        (resp : any) : Function => {
            return next();
        });
    }
    if (Androidfs.existsSync(AndroidAddframeworkInfo)) {
        prepare(() => {
            cli.exec("cd ./platforms && git clone https://github.com/steveleetn91/vn-native-3-android.git android && cd ./android && rm -rf ./.git ",
            (resp : any) : void => {
                cli.info(resp.toString())
            }, (resp : any) : void => {
                cli.info(resp.toString());
                cli.ok("Android OS really for development! ");
            });
        });
    }
}catch(error) {
    cli.error(error.toString());
}