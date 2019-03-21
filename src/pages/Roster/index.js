import React from "react";
import { Get } from "Public/js/Ajax";
import TableList from "Components/TableList";
import { Select } from "antd";
import "./index.less";

class Roster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {}
    };
  }
  componentWillMount() {
    /* 发送请求更新数据 */
    this._initRoster(this.props.fullPath);
  }

  componentWillReceiveProps(nextProps) {
    this._initRoster(nextProps.fullPath);
  }

  _initRoster(path) {
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
        <div className="roster">
        
        <div className="options">
          <span className="tip">请选择筛选条件：</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="选择年级"
            optionFilterProp="children"
            onChange={this.handleGrade}
          >
            <Select.Option value="15">15级</Select.Option>
            <Select.Option value="16">16级</Select.Option>
            <Select.Option value="17">17级</Select.Option>
            <Select.Option value="18">18级</Select.Option>
          </Select>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="选择支部"
            optionFilterProp="children"
            onChange={this.handleGroup}
          >
            <Select.Option value="computer_1">计算机类第一党支部</Select.Option>
            <Select.Option value="computer_2">计算机类第二党支部</Select.Option>
            <Select.Option value="electrical_1">
              电子信息类第一党支部
            </Select.Option>
            <Select.Option value="electrical_2">
              电子信息类第二党支部
            </Select.Option>
          </Select>
        </div>
        <TableList />

    </div>
    );
  }
}



export default Roster;
