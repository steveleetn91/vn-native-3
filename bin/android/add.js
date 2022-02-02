#!/usr/bin/env node
const cli = require("cli");
const fs = require('fs');
const frameworkInfo = './framework.json';
try {
    const prepare = (next) => {
        cli.exec("cd ./platforms && rm -rf ./android && mkdir android",(resp) => next(),(resp) => next());
    }
    if (fs.existsSync(frameworkInfo)) {
        prepare(() => {
            cli.exec("cd ./platforms && git clone https://github.com/steveleetn91/vn-native-3-android.git android && cd ./android && rm -rf ./.git ",(resp) => {
            cli.info(resp.toString())
            }, (resp) => {
                cli.info(resp.toString());
                cli.ok("Android OS really for development! ");
            });
        });
    }
}catch(error) {
    cli.error(error.toString());
}