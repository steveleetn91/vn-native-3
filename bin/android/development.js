#!/usr/bin/env node
const cli = require("cli");
const fs = require('fs');
const frameworkInfo = './framework.json';
const androidConfig = './platforms/android/app/src/main/AndroidManifest.xml';
const ip = require('ip');
require('dotenv').config()
try {
    const installDevelopment = () => {
        cli.exec("cp -r ./bin/android/java/Development.java ./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java",async (resp) => {
            cli.info(resp);
            let javaFile = await fs.readFileSync("./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java",
            { encoding: 'utf8', flag: 'r' });
            javaFile = javaFile.replaceAll('{{development_serve}}',ip.address() + ':' + process.env.PORT + '/index.html');
            await fs.writeFileSync(`./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java`, javaFile);
            cli.ok("Android develoopment mode ready, to use reload feature you need start web then start app with android studio. ");
        },async (resp) => {
            cli.info(resp);
            let javaFile = await fs.readFileSync("./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java",
            { encoding: 'utf8', flag: 'r' });
            javaFile = javaFile.replaceAll('{{development_serve}}',ip.address() + ':' + process.env.PORT);
            await fs.writeFileSync(`./platforms/android/app/src/main/java/com/example/myapplication/MainActivity.java`, javaFile);
            cli.ok("Android develoopment mode ready, to use reload feature you need start web then start app with android studio. ");
        })
    }
    const prepare = (next) => {
        cli.exec("cd ./platforms/android/app/src/main && rm -rf ./assets && mkdir assets",(req,res) => {
            return next();
        },(req,res) => {
            return next();
        });
    }
    if (fs.existsSync(frameworkInfo) && fs.existsSync(androidConfig)) {
        prepare(() => {
            cli.exec("vn3-web-build && cp -r ./platforms/web/build/* ./platforms/android/app/src/main/assets && cp -r ./platforms/android/views/index.html ./platforms/android/app/src/main/assets/index.html",(resp) =>{
                cli.info(resp);
                cli.ok("Completed prepare building Androis OS");
                cli.info("Installing development");
                installDevelopment();
            },
            (resp) => {
                cli.info(resp);
                cli.ok("Completed prepare building Androis OS");
                cli.info("Installing development");
                installDevelopment();
            });
        });
    }
}catch(error) {
    cli.error(error.toString());
}