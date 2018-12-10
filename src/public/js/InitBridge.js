/**
 * 配置轻应用顶部导航栏
 * https://wiki.upesn.com/pages/viewpage.action?pageId=2398303
 */
window.connectWebViewJavascriptBridge = function(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener(
            "WebViewJavascriptBridgeReady",
            function() {
                callback(WebViewJavascriptBridge);
            },
            false
        );
    }
};
window.connectWebViewJavascriptBridge(YonYouJSBridge => {
    YonYouJSBridge.init(function(message, responseCallback) {});
});
