import React from "react";
import { Button, Upload, Icon, message } from "antd";
import "./index.less";

let fileId = "";
let path = "";
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
      message.success(res.msg);
      path = res.data.filePath;
      fileId = res.data.fileId;
      console.log(res);
      this.props.uploadSuccessful();
    } else if (info.file.status === "error") {
      message.error("上传失败");
    }
  };

  render() {
    const uploadProps = {
      name: "file",
      action: "http://127.0.0.1:3005/api/roster/all/upload",
      // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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
