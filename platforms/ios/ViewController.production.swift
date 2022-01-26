import UIKit
import WebKit
class ViewController: UIViewController, WKUIDelegate, UIWebViewDelegate {
    
    var webView: WKWebView!
    
    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        view = webView
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        let myWebView:UIWebView = UIWebView(frame: CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height))
                
                self.view.addSubview(myWebView)
                
                myWebView.delegate = self;
                
                let myProjectBundle:Bundle = Bundle.main
                
                let filePath:String = myProjectBundle.path(forResource: "index", ofType: "html")!
                
                let myURL = URL(string: filePath);
                let myURLRequest:URLRequest = URLRequest(url: myURL!)
                
                myWebView.loadRequest(myURLRequest)
    }}
    func webViewDidStartLoad(_ webView: UIWebView)
    {
        print("Started to load")
    }
    func webViewDidFinishLoad(_ webView: UIWebView)
    {
        print("Finished loading")
    }
