#!/usr/bin/env node
const cli = require("cli");
const fs = require('fs');
const frameworkInfo = './framework.json';
try {
    if (fs.existsSync(frameworkInfo)) {
        cli.exec("cd ./platforms && rm -rf ./android && git clone https://github.com/steveleetn91/vn-native-3-android.git android && cd ./android && git checkout testing && rm -rf ./.git ",(resp) => {
            cli.info(resp.toString())
        }, (resp) => {
            cli.info(resp.toString());
            cli.ok("Android OS really for development! ");
        })
    }
}catch(error) {
    cli.error(error.toString());
}