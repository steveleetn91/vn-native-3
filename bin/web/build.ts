#!/usr/bin/env node
const cli = require('cli');
const fs = require('fs')
const BuildframeworkInfo = './framework.json';
import WebPackVNF from "./helpers/webpack.vnf";
try {
    let BuildwebHelper : WebPackVNF;
    BuildwebHelper = new WebPackVNF();
    const InstallIndex = (next : Function) => {
        cli.exec("cp -r ./platforms/web/views/production.ejs ./public/index.html", (resp: any) => {
            if (resp) {
                cli.ok("Start!!!");
                return next();
            }
        });
    }
    const restoreIndex = () => {
        cli.exec("cp -r ./platforms/web/views/development.ejs ./public/index.html", (resp: any) => {
            if (resp) {
                cli.ok("Stop!!!");
            }
        });
    }
    const buildWeb = (next : Function) => {
        cli.exec("cp -r ./public ./platforms/web/build && cp -r ./framework.json ./platforms/web/build/framework.json", (resp: any) => {
            if (resp) {
                cli.ok("Done build web!!", resp);
                return next();
            }
        });
    }
    const buildRouter = (next : Function) => {
        cli.exec("rm -rf ./public/assets && rm -rf ./platforms/web/build", (resp: any) => {
            if (resp) {
                cli.info("Core build", resp);
                BuildwebHelper.buildRouterPage();
                return next();
            }
        });

    }
    const buildPage = (next : Function) => {
        cli.info("Some times us need the wait");
        let listPageNeedBuild : Array<any>
        listPageNeedBuild = BuildwebHelper.listPage();
        /**
         * INIT 
         */
         const robotLoadPage = (listPageNeedBuild : Array<any>,key = 0) => {
            BuildwebHelper.buildSinglePage(listPageNeedBuild[key], true,() => {
                if((key + 1) < listPageNeedBuild.length) {
                    robotLoadPage(listPageNeedBuild,key + 1);
                } else if ((key + 1) == listPageNeedBuild.length) {
                   return next();
                }
            });
        }
        robotLoadPage(listPageNeedBuild,0);
    }
    const prepareBuild = async (next : Function) => {
        const lazyloadTemplate = await fs.readFileSync('./platforms/web/tmp/lazyload.vnf',
            { encoding: 'utf8', flag: 'r' });
        const listPage = BuildwebHelper.listPage();

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
    if (fs.existsSync(BuildframeworkInfo)) {
        InstallIndex(() => {
            cli.exec('rm -rf ./platforms/web/tmp/pages/*.ts', (resp: any) => {
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
