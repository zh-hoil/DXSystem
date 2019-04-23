import React from "react";
import { Button, Upload, Icon, message } from "antd";
import "./index.less";

let fileId = "";
class MyUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }
  onChange = info => {
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    this.setState({
        fileList:info.fileList.slice(-1)
    })
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
      fileId = info.file.uid;
    }
    if (info.file.status === "done") {
      message.success(`已成功上传 ${info.file.name}`);
      this.props.uploadSuccessful();
    } else if (info.file.status === "error") {
      message.error("上传失败");
    }
  }

  render() {
    const uploadProps = {
        name: "file",
        action: "//jsonplaceholder.typicode.com/posts/",
        accept: ".xlsx, .xls",
        onChange: this.onChange
      };
    return (
        <Upload
          className="upload"
          {...uploadProps}
          fileList={this.state.fileList}
        >
          <Button>
            <Icon type="upload" /> 上传党建大表
          </Button>
        </Upload>
    );
  }
}

export default MyUpload;
