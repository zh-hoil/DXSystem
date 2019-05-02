import React from "react";
import { Modal, Input, Button } from "antd";
import { Post } from "Public/js/Ajax";
import ADDROSTERURL from "Public/js/Api";
import MyUpload from "Components/MyUpload";
import Selection from "Components/Selection";
import "./index.less";

let newGrade = "";
let selectGroup = "";

class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      upload: false,
      newGrade: "",
      selectGroup: ""
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
    if (!selectGroup || !newGrade || !this.state.upload) {
      window.alert("请检查您的输入");
      return;
    }

    // Post(
    //   ADDROSTERURL,
    //   { grade: newGrade, group: selectGroup },
    //   res => {
    //     message.success("新建成功");
    //     this.closeModal();
    //     console.log(res);
    //   },
    //   err => {
    //     message.error(err.message);
    //     console.log(err);
    //   }
    // );

    console.log(e);
  };

  //取消新建
  handleCancel = e => {
    console.log(e);
    this.closeModal();
  };

  //选择支部
  handleSelectGroup = group => {
    console.log("选择的是 " + group);
    selectGroup = group;
  };

  //输入新建的年级
  inputChange = e => {
    this.setState({
      newGrade: e.target.value
    });
    console.log(newGrade);
  };

  uploadSuccessful = () => {
    this.setState({
      upload: true
    });
  };

  //关闭弹框所处理的函数
  closeModal = () => {
    this.setState({
      visible: false,
      upload: false,
      newGrade,
      selectGroup
    });
  };

  render() {
    return (
      <div className="my-modal">
        <Button type="primary" onClick={this.handleAdd}>
          新建
        </Button>
        <Modal
          title="新建大表"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            value={this.state.newGrade}
            placeholder="请输入年级，如：15级"
            onChange={this.inputChange}
          />
          <Selection
            defaultValue={this.state.selectGroup}
            handleChange={this.handleSelectGroup}
            selection={this.props.branchOptions}
          />
          <MyUpload uploadSuccessful={this.uploadSuccessful} />
        </Modal>
      </div>
    );
  }
}

export default MyModal;
