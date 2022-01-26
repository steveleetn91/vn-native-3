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
            
            let myURL = URL(string:"{{development_serve}}")
            let myRequest = URLRequest(url: myURL!)
            webView.load(myRequest)
        }
    func webViewDidStartLoad(_ webView: UIWebView)
    {
        print("Started to load")
    }
    func webViewDidFinishLoad(_ webView: UIWebView)
    {
        print("Finished loading")
    }
}
