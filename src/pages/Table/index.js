import React from "react";
import { Get } from "Public/js/Ajax";
import { Select } from "antd";
import "./index.less";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {}
    };
  }
  componentWillMount() {
    /* 发送请求更新数据 */
    this._initTable(this.props.fullPath);
  }

  componentWillReceiveProps(nextProps) {
    this._initTable(nextProps.fullPath);
  }

  _initTable(path) {
    console.log(path);
    // Get(
    //   path,
    //   this.state.params,
    //   res => {
    //       console.log("请求成功")
    //       console.log(res)
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  handleGrade(value) {
    console.log(value);
  }

  handleGroup(value) {
    console.log(value);
  }

  render() {
    return (
      <div className="table">表格页面</div>
    );
  }
}

export default Table;
