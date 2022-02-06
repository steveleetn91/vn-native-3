#!/usr/bin/env node
const AndroiDevelopmentcli = require("cli");
const AndroiDevelopmentfs = require('fs');
const AndroiDevelopmentframeworkInfo = './framework.json';
const AndroiDevelopmentAndroidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
const ip = require('ip');
require('dotenv').config()
try {
    const installDevelopment = () => {
        AndroiDevelopmentcli.exec("cp -r ./bin/android/java/Development.java ./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java"
        ,async (resp : any) => {
            AndroiDevelopmentcli.info(resp.toString());
            let javaFile = await AndroiDevelopmentfs.readFileSync("./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java",
            { encoding: 'utf8', flag: 'r' });
            javaFile = javaFile.replaceAll('{{development_serve}}',ip.address() + ':' + process.env.PORT + '/index.html');
            await AndroiDevelopmentfs.writeFileSync(`./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java`, javaFile);
            AndroiDevelopmentcli.ok("Android develoopment mode ready, to use reload feature you need start web then start app with android studio. ");
        },async (resp : any) => {
            AndroiDevelopmentcli.info(resp.toString());
            let javaFile = await AndroiDevelopmentfs.readFileSync("./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java",
            { encoding: 'utf8', flag: 'r' });
            javaFile = javaFile.replaceAll('{{development_serve}}',ip.address() + ':' + process.env.PORT);
            await AndroiDevelopmentfs.writeFileSync(`./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java`, javaFile);
            AndroiDevelopmentcli.ok("Android develoopment mode ready, to use reload feature you need start web then start app with android studio. ");
        })
    }
    const prepare = (next : Function) => {
        AndroiDevelopmentcli.exec("cd ./platforms/android/app/src/main && rm -rf ./assets && mkdir assets",(resp : any) => {
            return next();
        },(resp : any) => {
            return next();
        });
    }
    if (AndroiDevelopmentfs.existsSync(AndroiDevelopmentframeworkInfo) && AndroiDevelopmentfs.existsSync(AndroiDevelopmentAndroidConfig)) {
        prepare(() => {
            AndroiDevelopmentcli.exec("vn3-web-build && cp -r ./platforms/web/build/* ./platforms/android/app/src/main/assets && cp -r ./platforms/android/views/index.html ./platforms/android/app/src/main/assets/index.html",
            (resp : any) =>{
                AndroiDevelopmentcli.info(resp.toString());
                AndroiDevelopmentcli.ok("Completed prepare building Androis OS");
                AndroiDevelopmentcli.info("Installing development");
                installDevelopment();
            },
            (resp : any) => {
                AndroiDevelopmentcli.info(resp.toString());
                AndroiDevelopmentcli.ok("Completed prepare building Androis OS");
                AndroiDevelopmentcli.info("Installing development");
                installDevelopment();
            });
        });
    }
}catch(error) {
    AndroiDevelopmentcli.error(error.toString());
}