import React from "react";
import "./index.less";
import { Button } from "antd";
import Selection from "Components/Selection";
import MyModal from "Components/MyModal";
import { Get } from "Public/js/Ajax";
import { GRADEURL, BRANCHURL } from "Public/js/Api";

class Option extends React.Component {
  constructor(props) {
    super();
    this.state = {
      branchOptions: { placeholder: "选择支部", options: [] },
      gradeOptions: { placeholder: "选择年级", options: [] }
    };
  }

  componentWillMount() {
    this._initGrade();
    this._initBranch();
  }

  _initGrade = () => {
    Get(
      GRADEURL,
      {},
      res => {
        this.setState({
          gradeOptions: {
            ...this.state.gradeOptions,
            options: res.data
          }
        });
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  };

  _initBranch = () => {
    Get(
      BRANCHURL,
      {},
      res => {
        this.setState({
          branchOptions: {
            ...this.state.branchOptions,
            options: res.data
          }
        });
      },
      err => {
        console.log(err);
      }
    );
  };

  render() {
    return (
      <div className="options">
        <span className="tip">请选择筛选条件：</span>
        <Selection
          handleChange={this.props.handleGrade}
          selection={this.state.gradeOptions}
        />
        <Selection
          handleChange={this.props.handleBranch}
          selection={this.state.branchOptions}
        />
        <Button type="primary" href={this.props.href}>
          导出
        </Button>
        {this.props.fullPath === "/roster/all" ? (
          <MyModal branchOptions={this.state.branchOptions} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Option;
