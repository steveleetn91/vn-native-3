/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./plugins/vnnative3-router/interface.ts
var VnNative3RouterInterFace = /** @class */ (function () {
    function VnNative3RouterInterFace() {
    }
    return VnNative3RouterInterFace;
}());
/* harmony default export */ const vnnative3_router_interface = (VnNative3RouterInterFace);

;// CONCATENATED MODULE: ./plugins/vnnative3-router/struct.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var VnNative3RouterStruct = /** @class */ (function (_super) {
    __extends(VnNative3RouterStruct, _super);
    function VnNative3RouterStruct() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VnNative3RouterStruct.prototype.set = function (data) {
        this.config = data;
    };
    VnNative3RouterStruct.prototype.init = function () {
        this.config.forEach(function (router) {
            if (window.location.pathname === router.url) {
                document.getElementById("root").innerHTML = router.page;
            }
        });
    };
    return VnNative3RouterStruct;
}(vnnative3_router_interface));
/* harmony default export */ const struct = (VnNative3RouterStruct);

;// CONCATENATED MODULE: ./plugins/vnnative3-router/index.ts
var vnnative3_router_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var VnNative3Router = /** @class */ (function (_super) {
    vnnative3_router_extends(VnNative3Router, _super);
    function VnNative3Router() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VnNative3Router;
}(struct));
/* harmony default export */ const vnnative3_router = (VnNative3Router);

;// CONCATENATED MODULE: ./pages/index.ts
var IndexPage = /** @class */ (function () {
    function IndexPage() {
    }
    IndexPage.prototype.render = function () {
        console.log("OK");
    };
    return IndexPage;
}());
/* harmony default export */ const pages = (IndexPage);

;// CONCATENATED MODULE: ./src/router.ts

var RouterConfig = /** @class */ (function () {
    function RouterConfig() {
    }
    RouterConfig.prototype.config = function () {
        return [
            {
                url: "/",
                page: pages
            }
        ];
    };
    return RouterConfig;
}());
/* harmony default export */ const router = (RouterConfig);

;// CONCATENATED MODULE: ./src/bootstrap.ts


var Router = new router;
var ModuleConfig = new vnnative3_router;
ModuleConfig.set(Router.config());
ModuleConfig.init();
var VnNativeBootstrap = /** @class */ (function () {
    function VnNativeBootstrap() {
    }
    return VnNativeBootstrap;
}());

/******/ })()
;