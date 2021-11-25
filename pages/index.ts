import HTMLPageInterFace from 'vnnative3-webview/HTMLPage'
import VnNative3HTMLElement from 'vnnative3-webview/HTMLElement/index'
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
    public render() : string {
        return (new VnNative3HTMLElement).make(`
        <div onclick="IndexPage.notifi()">
            <h1>{{title}}</h1>
            <p>{{slogan}}</p>
        </div>
        `,this.state);
    }
}