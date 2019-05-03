import React from "react";
import { Button, Upload, Icon, message } from "antd";
import "./index.less";
class MyUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }
  onChange = info => {
    this.setState({
      fileList: info.fileList.slice(-1)
    });
    if (info.file.status === "done") {
      let res = info.file.response;
      if (res.code === 200) {
        message.success(res.msg);
        this.props.uploadSuccessful(res.data.fileId);
      } else {
        message.error(res.msg);
      }
    } else if (info.file.status === "error") {
      message.error("上传失败");
    }
  };

  render() {
    const uploadProps = {
      name: "file",
      action: "http://127.0.0.1:3005/api/roster/all/upload",
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
