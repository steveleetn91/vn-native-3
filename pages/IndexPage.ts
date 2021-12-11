import HTMLPageInterFace from 'vnnative3-webview/dist/HTMLPage'
import VnNative3HTMLElement from 'vnnative3-webview/dist/HTMLElement/index';
import VnNative3Redirect from 'vnnative3-redirect/dist/index'
import '../assets/styles/global.scss';
export default class IndexPage implements HTMLPageInterFace {
    state = {
        title : "",
        slogan: ""
    };
    constructor() {
        
    }
    public beforeRender() : void {
        this.state['title'] = "Vn Native Framework - Beta";
        this.state['slogan'] = "Cross Platforms";
    }
    public afterRender() : void {
        
    }
    public test(){
        return (new VnNative3HTMLElement).next(() => {
            console.log("Test event next 1");
        }).next(() => {
            console.log("Test event next 2");
        });
    }
    public render() : string {
        return (new VnNative3HTMLElement).head({
            title: "Vn Native Framework - V3",
            slogan : "Cross platforms"
        }).next(() => {
            console.log("Hello I'm next 1!");
        }).next(() => {
            console.log("Hello I'm next 2!");
        }).make(`
        <div class="info-box">
            <div class="logo"></div>
            <h1 onclick="IndexPage.test()">{{title}}</h1>
            <p>{{slogan}}</p>
        </div>
        `,this.state);
    }
}