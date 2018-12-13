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
        let {salematerialData,studymaterialData} = this.props;
        return (
            <div className="file_access">
                <FileHref
                    title="销售资料"
                    fileObj={salematerialData}
                    emptyMsg="暂未提供销售资料"
                />
                <FileHref
                    title="实施资料"
                    fileObj={studymaterialData}
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
 * @param {Object} fileObj 文件信息
 * @param {String} emptyMsg  无数据 内容
 */
const FileHref = props => {
    let { title, fileObj, emptyMsg } = props;
    // 文件路径，文件标题
    let fileHrefDom = emptyMsg;
    if (fileObj) {
        let { src: fileHref, title: fileTitle } = fileObj;
        fileHrefDom = <a href={fileHref}>{fileTitle}</a>;
    }
    return (
        <div className="file-href">
            <div className="title">{title}</div>
            {fileHrefDom}
        </div>
    );
};

export default FileAccess;
