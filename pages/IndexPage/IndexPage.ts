import HTMLPageInterFace from 'vnnative3-webview/dist/HTMLPage'
import VnNative3HTMLElement from 'vnnative3-webview/dist/HTMLElement/index';
import './IndexPage.scss';
import IndexPageStateInterface from './IndexPage.State.Interface';
import VnNative3Location from 'vnnative3-location/dist/index';
import header from '../../components/header/header';
export default class IndexPage implements HTMLPageInterFace {
    state : IndexPageStateInterface = {
        title : "Vn Native Framework 3 ",
        slogan : "Cross platforms - Version 1.3.3",
        header : header(),
        examplePageUrl : (new VnNative3Location).redirect.goUrl('/page/example',[])
    }; 
    constructor() {} 
    public beforeRender() : void {}  
    public afterRender() : void {}    
    public render() : string {
        return (new VnNative3HTMLElement).head(this.state).next(() => {
            console.log("Hello I'm next action ! You can use a lots of actions");
        }).make(require('./IndexPage.html').default,this.state); 
    }  
}             