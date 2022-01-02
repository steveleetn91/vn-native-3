import VnNative3HTMLElement from "vnnative3-webview/dist/HTMLElement/HTMLElement";

export default function footer() : string {
    return ( new VnNative3HTMLElement).make(require('./footer.html').default,{});
}