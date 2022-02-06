export default interface WebPackVNFInterface {
    listPage() : Array<any>
    listPageNeedBuild() : Array<any>
    buildSinglePage(pageName : string,rebuild : boolean,callback : Function) : void
    buildRouterPage (rebuild : boolean) : void 
    buildSinglePageiOS(pageName : string,rebuild : boolean,callback : Function) : void
    buildRouterPageiOS(rebuild : boolean) : void
}