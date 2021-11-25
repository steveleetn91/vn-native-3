import HTMLPageInterFace from 'vnnative3-webview/dist/HTMLPage'
import VnNative3HTMLElement from 'vnnative3-webview/dist/HTMLElement/index';
import VnNative3Redirect from 'vnnative3-redirect/dist/index'
import '../styles/global.scss';
export default class IndexPage implements HTMLPageInterFace {
    state = {
        title : "",
        slogan: ""
    };
    constructor() {
        
    }
    public beforeRender() : void {
        this.state['title'] = "Vn Native 3 Framework";
        this.state['slogan'] = "Cross Framework";
    }
    public afterRender() : void {
        
    }
    public test(){
        // 404 
        return (new VnNative3Redirect).to('home/test2');
    }
    public render() : string {
        return (new VnNative3HTMLElement).make(`
        <div>
            <h1 onclick="IndexPage.test()">{{title}}</h1>
            <p>{{slogan}}</p>
        </div>
        `,this.state);
    }
}