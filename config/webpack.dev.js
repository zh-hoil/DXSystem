const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const common = require("./webpack.common");

module.exports = (dirname, config) => {
    const { host, port } = config;
    console.log("development >>>>>>>>>>>>>>>>>>>>>>>>>>>");
    return merge(common(dirname), {
        mode: "development",
        devtool: "eval-source-map",
        devServer: {
            contentBase: path.join(dirname, "dist"),
            port: port, // 端口号
            host: host, // 主机地址
            inline: true,
            hot: true,
            open: false,
            lazy: false,
            overlay: {
                warnings: true,
                errors: true
            },
            clientLogLevel: "error",
            // 开启报错提示
            stats: "errors-only"
        },
        module: {
            rules: [
                {
                    test: /\.(less|css)$/,
                    use: [
                      {
                        loader: "style-loader"
                      },
                      {
                        loader: "css-loader" // translates CSS into CommonJS
                      },
                      {
                        loader: "less-loader", // compiles Less to CSS
                        options: {
                          modifyVars: {
                            "primary-color": "#ff4242f2",
                            "box-shadow-base": "0 0 0 2px rgba(255, 76, 76, 0.2),"
                          },
                          javascriptEnabled: true
                        }
                      }
                    ]
                    // ...other rules
                  }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new OpenBrowserPlugin({ url: `http://${host}:${port}` })
        ]
    });
};
