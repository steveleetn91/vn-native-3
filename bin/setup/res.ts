#!/usr/bin/env node 
import * as cli from "cli";
import { Options, run } from 'cordova-res';
let fsRes : any = require("fs");
const ResframeworkInfo = './framework.json';
if(fsRes.existsSync(ResframeworkInfo)) {
    const ResConstructionGlobal : Function = async (callback : Function) : Promise<Function>  => {
        const platformsRsAndroid = { icon: { sources: ['resources/android.png'] },splash: { sources: ['resources/splash.png'] } }
        const platformsRsIOS = { icon: { sources: ['resources/ios.png'] },splash: { sources: ['resources/splash.png'] } }
        const options: Options = {
            directory: __dirname + "/../../../",
            resourcesDirectory: 'resources',
            logstream: process.stdout, // Any WritableStream
            platforms: {
              android: platformsRsAndroid,
              ios: platformsRsIOS,
            },
          };
          
          await run(options);
          return callback();
    }
    ResConstructionGlobal(() => {
        cli.ok("You has been config icon/splash successfully!")
    });
}