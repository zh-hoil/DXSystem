const JSBridge = data => {
    window.connectWebViewJavascriptBridge
        ? window.connectWebViewJavascriptBridge(YonYouJSBridge => {
              YonYouJSBridge.send(JSON.stringify(data), function(
                  responseData
              ) {});
          })
        : "";
};
export const updateAppTitle = title => {
    var titleData = {
        function: "configNavBar",
        parameters: {
            centerItems: [
                {
                    title: title,
                    callback: "appTitleChange"
                }
            ]
        }
    };
    JSBridge(titleData);
};
