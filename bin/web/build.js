#!/usr/bin/env node
const cli = require('cli');
const fs = require('fs')
const frameworkInfo = './framework.json';
const webpackHelper = require('./helpers/webpack.vnf');
const webHelper = require('./helpers/webpack.vnf');
try {
    const InstallIndex = (next) => {
        cli.exec("cp -r ./platforms/web/views/production.ejs ./public/index.html", (resp) => {
            if (resp) {
                cli.ok("Start!!!");
                return next();
            }
        });
    }
    const restoreIndex = () => {
        cli.exec("cp -r ./platforms/web/views/development.ejs ./public/index.html", (resp) => {
            if (resp) {
                cli.ok("Stop!!!");
            }
        });
    }
    const buildWeb = (next) => {
        cli.exec("cp -r ./public ./platforms/web/build && cp -r ./framework.json ./platforms/web/build/framework.json", (resp) => {
            if (resp) {
                cli.ok("Done build web!!", resp);
                return next();
            }
        });
    }
    const buildRouter = (next) => {
        cli.exec("rm -rf ./public/assets && rm -rf ./platforms/web/build", (resp) => {
            if (resp) {
                cli.info("Core build", resp);
                webHelper.buildRouterPage();
                return next();
            }
        });

    }
    const buildPage = (next) => {
        cli.info("Some times us need the wait");
        const listPageNeedBuild = webHelper.listPage();
        /**
         * INIT 
         */
         const robotLoadPage = (listPageNeedBuild,key = 0) => {
            webHelper.buildSinglePage(listPageNeedBuild[key], true,() => {
                if((key + 1) < listPageNeedBuild.length) {
                    robotLoadPage(listPageNeedBuild,key + 1);
                } else if ((key + 1) == listPageNeedBuild.length) {
                   return next();
                }
            });
        }
        robotLoadPage(listPageNeedBuild,0);
    }
    const prepareBuild = async (next) => {
        const lazyloadTemplate = await fs.readFileSync('./platforms/web/tmp/lazyload.vnf',
            { encoding: 'utf8', flag: 'r' });
        const listPage = webpackHelper.listPage();

        for (let i = 0; i < listPage.length; i++) {
            let page = listPage[i];
            page = page.toString().replaceAll('.ts', '');
            const tmp_lazyloadTemplate = lazyloadTemplate.replaceAll('{page_name}', page);
            fs.writeFileSync(`./platforms/web/tmp/pages/${page}.ts`, tmp_lazyloadTemplate);
            if ((i + 1) === listPage.length) {
                return next();
            }
        }
    }
    if (fs.existsSync(frameworkInfo)) {
        InstallIndex(() => {
            cli.exec('rm -rf ./platforms/web/tmp/pages/*.ts', (resp) => {
                if (resp) {
                    prepareBuild(() => {
                        buildRouter(() => {
                            buildPage(() => {
                                buildWeb(() => {
                                    restoreIndex();
                                });
                            });
                        });
                    });
                }
            });
        });
    }
} catch (err) {
    cli.error(err.toString());
}
