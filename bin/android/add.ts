#!/usr/bin/env node
const Androidcmd = require('cli');
const Androidfs = require('fs');
const AndroidAddframeworkInfo = './framework.json';
try {
    const prepare = (next : Function) => {
        Androidcmd.exec("cd ./platforms && rm -rf ./android && mkdir android",(resp : any) => next(),(resp : any) => next());
    }
    if (Androidfs.existsSync(AndroidAddframeworkInfo)) {
        prepare(() => {
            Androidcmd.exec("cd ./platforms && git clone https://github.com/steveleetn91/vn-native-3-android.git android && cd ./android && rm -rf ./.git ",(resp : any) => {
                Androidcmd.info(resp.toString())
            }, (resp : any) => {
                Androidcmd.info(resp.toString());
                Androidcmd.ok("Android OS really for development! ");
            });
        });
    }
}catch(error) {
    Androidcmd.error(error.toString());
}