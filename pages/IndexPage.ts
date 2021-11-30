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
        // 404 
        return (new VnNative3Redirect).to('home/test2');
    }
    public render() : string {
        return (new VnNative3HTMLElement).make(`
        <div class="info-box">
            <div class="logo"></div>
            <h1 onclick="IndexPage.test()">{{title}}</h1>
            <p>{{slogan}}</p>
        </div>
        `,this.state);
    }
}