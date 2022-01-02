import HTMLPageInterFace from 'vnnative3-webview/dist/HTMLPage'
import VnNative3HTMLElement from 'vnnative3-webview/dist/HTMLElement/index';
import './IndexPage.scss';
import IndexPageStateInterface from './IndexPage.State.Interface';
import header from '../../components/header/header';
import homeIntro from '../../components/homeIntro/homeIntro';
import footer from '../../components/footer/footer';
import { Dropdown } from "bootstrap";
import VnNative3Form from 'vnnative3-form/dist/index';
export default class IndexPage implements HTMLPageInterFace {
    state : IndexPageStateInterface = {
        title : "Vn Native Framework 3",
        slogan : "Cross platforms - Version 1.3",
        logo : require('../../assets/images/logo.png').default,
        header : header(),
        homeIntro : homeIntro(),
        footer : footer() 
    };
    constructor() {}
    public beforeRender() : void {}
    public afterRender() : void {
        let button = new VnNative3Form("button_navbar").subscribe();
        let menu = new VnNative3Form("navbarNavDropdown").subscribe();
        menu.addEventListener("bs.collapse.show",(ev : Event) => {
            new Dropdown(menu,{}).show();
        })
        menu.addEventListener("bs.collapse.hide",(ev : Event) => {
            new Dropdown(menu,{}).hide();
        })
    }
    public render() : string {
        return (new VnNative3HTMLElement).head(this.state).next(() => {
            console.log("Hello I'm next action ! You can use a lots actions");
        }).make(require('./IndexPage.html').default,this.state);
    }
}