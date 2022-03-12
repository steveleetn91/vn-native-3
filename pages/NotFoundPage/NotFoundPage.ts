import HTMLPageInterFace from 'vnnative3-webview/dist/HTMLPage'
import VnNative3HTMLElement from 'vnnative3-webview/dist/HTMLElement/index';
import './NotFoundPage.scss';
import NotFoundPageStateInterface from './NotFoundPage.State.Interface';
import header from '../../components/header/header';
const packageJson = require('../../package.json');
export default class NotFoundPage implements HTMLPageInterFace {
    state : NotFoundPageStateInterface = {
        title : "Vn Native 3",
        slogan : "Cross platforms - Version " + packageJson.version,
        header : header()
    }
    constructor() {}      
    public beforeRender() : void {}   
    public afterRender() : void {
    }      
    public render() : string { 
        return (new VnNative3HTMLElement).head(this.state).next(() => {
            console.log("Hello 2 I'm next action ! You can use a lots of actions ");
        }).make(require('./NotFoundPage.html').default,this.state); 
    }  
}              