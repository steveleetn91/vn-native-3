#!/usr/bin/env node
import * as cli from "cli";;
const AndroiDevelopmentfs = require('fs');
const AndroiDevelopmentframeworkInfo = './framework.json';
const AndroiDevelopmentAndroidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
const ip = require('ip');
require('dotenv').config()
try {
    const installDevelopment = () => {
        cli.exec("cp -r ./bin/android/java/Development.java ./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java"
        ,async (resp : any) => {
            cli.info(resp.toString());
            let javaFile = await AndroiDevelopmentfs.readFileSync("./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java",
            { encoding: 'utf8', flag: 'r' });
            javaFile = javaFile.replaceAll('{{development_serve}}',ip.address() + ':' + process.env.PORT + '/index.html');
            await AndroiDevelopmentfs.writeFileSync(`./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java`, javaFile);
            cli.ok("Android develoopment mode ready, to use reload feature you need start web then start app with android studio. ");
        },async (resp : any) => {
            cli.info(resp.toString());
            let javaFile = await AndroiDevelopmentfs.readFileSync("./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java",
            { encoding: 'utf8', flag: 'r' });
            javaFile = javaFile.replaceAll('{{development_serve}}',ip.address() + ':' + process.env.PORT);
            await AndroiDevelopmentfs.writeFileSync(`./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java`, javaFile);
            cli.ok("Android develoopment mode ready, to use reload feature you need start web then start app with android studio. ");
        })
    }
    const prepare = (next : Function) => {
        cli.exec("cd ./platforms/android/app/src/main && rm -rf ./assets && mkdir assets",(resp : any) => {
            return next();
        },(resp : any) => {
            return next();
        });
    }
    if (AndroiDevelopmentfs.existsSync(AndroiDevelopmentframeworkInfo) && AndroiDevelopmentfs.existsSync(AndroiDevelopmentAndroidConfig)) {
        prepare(() => {
            cli.exec("vn3-web-build && cp -r ./platforms/web/build/* ./platforms/android/app/src/main/assets && cp -r ./platforms/android/views/index.html ./platforms/android/app/src/main/assets/index.html",
            (resp : any) =>{
                cli.info(resp.toString());
                cli.ok("Completed prepare building Androis OS");
                cli.info("Installing development");
                installDevelopment();
            },
            (resp : any) => {
                cli.info(resp.toString());
                cli.ok("Completed prepare building Androis OS");
                cli.info("Installing development");
                installDevelopment();
            });
        });
    }
}catch(error) {
    cli.error(error.toString());
}