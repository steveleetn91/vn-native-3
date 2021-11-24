import VnNative3Router from "../plugins/vnnative3-router";
import RouterConfig from "./router";
let Router = new RouterConfig;
let ModuleConfig = new VnNative3Router;
ModuleConfig.set(Router.config());
ModuleConfig.init();
class VnNativeBootstrap {
    beforeRender(){}
    afterRender(){}
}
export default VnNativeBootstrap