import React from "react";
import download from "Assets/images/download.png";
/**
 * 获取相关资料文件组件
 */
class FileAccess extends React.Component {
    constructor(props) {
        super(props);
    }
    handleDataGet = () => {
        let confirm = window.confirm("确定将资料发送到您邮箱？");
        if (confirm) {
            //发送网络请求
        }
    };
    render() {
        let { salematerialData, studymaterialData } = this.props;
        return (
            <div className="file_access">
                <FileHref
                    title="销售资料"
                    fileArray={salematerialData}
                    emptyMsg="暂未提供销售资料"
                />
                <FileHref
                    title="实施资料"
                    fileArray={studymaterialData}
                    emptyMsg="暂未提供实施资料"
                />
                <div className="data-get" onClick={this.handleDataGet}>
                    <span
                        className="download-icon"
                        style={{
                            background: `url(${download}) no-repeat`,
                            backgroundSize: "40px"
                        }}
                    />
                    索取资料
                </div>
            </div>
        );
    }
}

/**
 * 资源列表
 * @param {String} title 标题
 * @param {Object} fileArray 文件信息
 * @param {String} emptyMsg  无数据 内容
 */
const FileHref = props => {
    let { title, fileArray, emptyMsg } = props;
    // 文件路径，文件标题
    let fileHrefDom = emptyMsg;
    if (fileArray && fileArray.length > 0) {
        fileHrefDom = fileArray.map((item, index) => {
            let { src: fileHref, title: fileTitle } = item;
            return (
                <a key={index} href={fileHref}>
                    {fileTitle}
                </a>
            );
        });
    }
    return (
        <div className="file-href">
            <div className="title">{title}</div>
            {fileHrefDom}
        </div>
    );
};

export default FileAccess;
