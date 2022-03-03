import VnNative3Router from "vnnative3-router/dist/index";
import RouterConfig from "./router";
let Router = new RouterConfig;
let ModuleConfig = new VnNative3Router();
ModuleConfig.set(Router.config(),Router.notFound());
ModuleConfig.init();
class VnNativeBootstrap {
    public beforeRender(){
        return true;
    }
    public afterRender(){
        return true;
    }
}
export default VnNativeBootstrap