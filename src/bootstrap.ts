import VnNative3Router from "vnnative3-router/dist/index";
import RouterConfig from "./router";
const Router : RouterConfig = new RouterConfig;
const ModuleConfig : VnNative3Router = new VnNative3Router();
ModuleConfig.set(Router.config(),Router.notFound());
ModuleConfig.init();
class VnNativeBootstrap {}
export default VnNativeBootstrap