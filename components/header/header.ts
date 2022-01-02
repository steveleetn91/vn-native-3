import VnNative3HTMLElement from "vnnative3-webview/dist/HTMLElement/HTMLElement";

export default function header() : string  {
    return (new VnNative3HTMLElement).make(require('./header.html').default,{
        logo : require('../../assets/images/logo.png').default
    });
}