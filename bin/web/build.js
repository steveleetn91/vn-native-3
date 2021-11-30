#!/usr/bin/env node
let cli = require('cli');
const fs = require('fs')
const frameworkInfo = './framework.json';
const webpackHelper = require('./helpers/webpack.vnf');
try {
    let buildWeb = () => {
        cli.exec(`cp -r ./public ./platforms/web/build && cp -r ./framework.json ./platforms/web/build/framework.json 
        && cp -r ./platforms/web/views/production.html ./platforms/web/build/index.html `, (success) => {
            if (success) {
                cli.ok("Done!!!");
            }
        });
    }
    let buildRouter = (next) => {
        cli.exec("rm -rf ./public/assets && rm -rf ./platforms/web/build && npx webpack --config webpack.config.prod.js", (success) => {
            if (success) {
                cli.info(success.toString());
                cli.info("Router build done !!!");
                return next();
            }
        });
        
    }
    let buildPage = (next) => {
        cli.exec("npx webpack --config ./bin/web/webpack.lazyload.js", (success) => {
            if (success) {
                cli.info(success.toString());
                cli.info("Page build done !!!");
            }
        });
        return next();
    }
    let prepareBuild = async (callback) => {
        const lazyloadTemplate = await fs.readFileSync('./platforms/web/tmp/lazyload.vnf',
        {encoding:'utf8', flag:'r'});
        let listPage = webpackHelper.listPage();

        for(let i=0;i<listPage.length;i++){
            let page = listPage[i];
            page = page.toString().replaceAll('.ts','');
            let tmp_lazyloadTemplate = lazyloadTemplate.replaceAll('{page_name}',page);
            fs.writeFileSync(`./platforms/web/tmp/pages/${page}.ts`,tmp_lazyloadTemplate);
            if((i+1)===listPage.length){
                return callback();
            }
        }
        
    }
    if (fs.existsSync(frameworkInfo)) {
        cli.ok("Starting build web ... ");
        cli.exec('rm -rf ./platforms/web/tmp/pages/*.ts',(message) => {
            prepareBuild(() => {
                buildRouter(() => {
                    buildPage(() => {
                        buildWeb();
                    });
                });
            });
        });
        
    }
} catch (err) {
    cli.error(err.toString());
}