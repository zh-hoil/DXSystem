import React from "react";
import { Modal, Input, Button, message, Upload, Icon } from "antd";
import { Post } from "Public/js/Ajax";
import Selection from "Components/Selection";
import "./index.less";

class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      visible: false,
      upload: false,
      grade: "",
      fileId: "",
      branch: undefined
    };
  }
  handleAdd = () => {
    console.log("新建大表");
    this.setState({
      visible: true
    });
  };

  //确认新建
  handleOk = e => {
    if (
      // !this.state.branch ||
      // !this.state.grade ||
      !this.state.upload
    ) {
      window.alert("请检查您的输入");
      return;
    }
    let params = {
      // grade: this.state.grade,
      // branch: this.state.branch,
      fileId: this.state.fileId
    };
    console.log(params);
    Post(
      this.props.path + this.props.confirmUrl,
      params,
      res => {
        if (res.code === 200) {
          message.success(res.msg);
        } else {
          message.error(res.msg);
        }
        this.closeModal();
      },
      err => {
        console.log(err);
      }
    );
  };

  //取消新建
  handleCancel = e => {
    console.log(e);
    this.closeModal();
  };

  //选择支部
  handleSelectBranch = branch => {
    console.log("选择的是 " + branch);
    this.setState({
      branch: branch
    });
  };

  //输入新建的年级
  inputChange = e => {
    this.setState({
      grade: e.target.value
    });
    console.log(this.state.grade);
  };

  //关闭弹框所处理的函数
  closeModal = () => {
    this.setState({
      visible: false,
      upload: false,
      // grade: "",
      fileId: "",
      // branch: undefined,
      fileList: []
    });
  };

  fileChange = info => {
    this.setState({
      fileList: info.fileList.slice(-1)
    });
    if (info.file.status === "done") {
      let res = info.file.response;
      if (res.code === 200) {
        let fileId = res.data.fileId;
        info.fileList.pop();
        this.setState({ upload: true, fileId });
        message.success(res.msg);
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
      action: `http://127.0.0.1:3000/api${this.props.path}/upload`,
      accept: this.props.accept,
      onChange: this.fileChange
    };

    return (
      <div className="my-modal">
        <Button type="primary" onClick={this.handleAdd}>
          新建文件
        </Button>
        <Modal
          title="新建文件"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* <Input
            value={this.state.grade}
            placeholder="请输入年级，如：15级"
            onChange={this.inputChange}
          />
          <Selection
            defaultValue={this.state.branch}
            handleChange={this.handleSelectBranch}
            selection={this.props.branchOptions}
          /> */}
          <Upload
            className="upload"
            {...uploadProps}
            fileList={this.state.fileList}
          >
            <Button>
              <Icon type="upload" /> 上传党建大表
            </Button>
          </Upload>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
