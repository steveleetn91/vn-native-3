package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
public class MainActivity extends AppCompatActivity {

    private Context activityContext;
    private MyWebViewClient MyWebViewClient;
    @SuppressLint("JavascriptInterface")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        WebView myWebView = (WebView) findViewById(R.id.webview);
        myWebView.getSettings().setJavaScriptEnabled(true);
        myWebView.getSettings().setUseWideViewPort(true);
        myWebView.setWebViewClient(new MyWebViewClient());
        myWebView.setWebChromeClient(new WebChromeClient());
        VnNativeOs vnos = new VnNativeOs(this, getPreferences(Context.MODE_PRIVATE), myWebView);
        myWebView.addJavascriptInterface(vnos, "vnnativeos");
        myWebView.loadUrl("{{development_serve}}");
    }
}
