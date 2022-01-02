import VnNative3HTMLElement from "vnnative3-webview/dist/HTMLElement/HTMLElement";

export default function homeIntro() : string  {
    return (new VnNative3HTMLElement).make(require('./homeIntro.html').default,{
        banner : require('../../assets/images/introbanner.jpg').default
    });
}