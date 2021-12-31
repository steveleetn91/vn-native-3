import HTMLPageInterFace from 'vnnative3-webview/dist/HTMLPage'
import VnNative3HTMLElement from 'vnnative3-webview/dist/HTMLElement/index';
import VnNative3Redirect from 'vnnative3-redirect/dist/index'
import '../assets/styles/global.scss';
export default class IndexPage implements HTMLPageInterFace {
    state = {
        title : "",
        slogan: "",
        logo : require('../assets/images/logo.png')
    };
    constructor() {
        
    }
    public beforeRender() : void {
        this.state['title'] = "Vn Native Framework - Beta";
        this.state['slogan'] = "Cross Platforms";
    }
    public afterRender() : void {
        
    }
    public render() : string {
        return (new VnNative3HTMLElement).head(this.state).next(() => {
            console.log("Hello I'm next 1!");
        }).next(() => {
            console.log("Hello I'm next 2!");
        }).make(`
        <div class="info-box">
            <div class="site-logo">
                <img src="{{logo.default}}"/>
            </div>
            <h1>{{title}}</h1>
            <p>{{slogan}}</p>
        </div>
        `,this.state);
    }
}