#!/usr/bin/env node
import * as cli from "cli";
import WebPackVNF from "./helpers/webpack.vnf";
const fs = require('fs')
const BuildframeworkInfo = './framework.json';
try {
    let BuildwebHelper : WebPackVNF;
    BuildwebHelper = new WebPackVNF();
    const InstallIndex : Function = (next : Function) : void => {
        cli.exec("cp -r ./platforms/web/views/production.ejs ./public/index.html", (resp: any) => {
            if (resp) {
                cli.ok("Start!!!");
                return next();
            }
        });
    }
    const restoreIndex : Function = () : void => {
        cli.exec("cp -r ./platforms/web/views/development.ejs ./public/index.html", (resp: any) => {
            if (resp) {
                cli.ok("Stop!!!");
            }
        });
    }
    const buildWeb : Function = (next : Function) : void => {
        cli.exec("cp -r ./public ./platforms/web/build && cp -r ./framework.json ./platforms/web/build/framework.json", (resp: any) => {
            if (resp) {
                cli.ok("Done build web!!" + resp.toString());
                return next();
            }
        });
    }
    const buildRouter : Function = (next : Function) : void => {
        cli.exec("rm -rf ./public/assets && rm -rf ./platforms/web/build", (resp: any) => {
            if (resp) {
                cli.info("Core build" +  resp.toString());
                BuildwebHelper.buildRouterPage();
                return next();
            }
        });

    }
    const cleanCachePage : Function = (next : Function) : void => {
        cli.exec("rm -rf ./platforms/web/tmp/pages/*.ts",(resp) => {
            return next();
        },(resp) => {
            return next();
        })
    }
    const buildPage : Function = (next : Function) : void => {
        cli.info("Some times us need the wait");
        let listPageNeedBuild : Array<any>
        listPageNeedBuild = BuildwebHelper.listPage();
        /**
         * INIT 
         */
         const robotLoadPage : Function = (listPageNeedBuild : Array<any>,key : number = 0) : void | Function => {
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
    const prepareBuild : Function = async (next : Function) : Promise<Function> => {
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
                            cleanCachePage(() => {
                                buildPage(() => {
                                    buildWeb(() => {
                                        restoreIndex();
                                    });
                                });    
                            });
                        });
                    });
                }
            });
        });
    }
} catch (err : any) {
    cli.error(err.toString());
}
