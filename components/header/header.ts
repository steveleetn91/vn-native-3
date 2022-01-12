import VnNative3HTMLElement from "vnnative3-webview/dist/HTMLElement/HTMLElement";
import headerInterface from "./header.interface";
import './header.scss';
export default function header () : string {
    const state : headerInterface = {
        logo : require('../../assets/images/logo.png').default
    };
    return (new VnNative3HTMLElement).make(require('./header.html').default,state);
}