import HTMLPageInterFace from 'vnnative3-webview/dist/HTMLPage'
import VnNative3HTMLElement from 'vnnative3-webview/dist/HTMLElement/index';
import './ExamplePage.scss';
import ExamplePageStateInterface from './ExamplePage.State.Interface';
import VnNative3Location from 'vnnative3-location/dist/index';
import header from '../../components/header/header';
export default class ExamplePage implements HTMLPageInterFace {
    state : ExamplePageStateInterface = {
        title : "Example page ",
        slogan : "Document",
        header : header(),
        homePage : (new VnNative3Location).redirect.goUrl('/index.html',[]) 
    }; 
    constructor() {} 
    public beforeRender() : void {}  
    public afterRender() : void {}    
    public render() : string {
        return (new VnNative3HTMLElement).head(this.state).next(() => {
            console.log("Hello I'm next action ! You can use a lots of actions");
        }).make(require('./ExamplePage.html').default,this.state); 
    }  
}             