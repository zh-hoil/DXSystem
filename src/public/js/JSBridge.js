/**
 * 配置轻应用顶部导航栏
 * https://wiki.upesn.com/pages/viewpage.action?pageId=2398303
 */
function connectWebViewJavascriptBridge(callback) {
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
}
const JSBridge = data => {
    connectWebViewJavascriptBridge(YonYouJSBridge => {
        YonYouJSBridge.init(function(message, responseCallback) {});
        YonYouJSBridge.send(JSON.stringify(data), function(responseData) {});
    });
};
export const updateAppTitle =(title)=>{
    var homeTitleData = {
        'function': 'configNavBar',
        parameters: {
            centerItems: [{
                title: title,
                callback: ''
            }]
        }
    };
    JSBridge(homeTitleData);
}
