import React from "react";
import "./index.less";
import { Button } from "antd";
import Selection from "Components/Selection";
import MyModal from "Components/MyModal";
import { Get } from "Public/js/Ajax";
import { GRADEURL, BRANCHURL, EXPORTURL } from "Public/js/Api";
import { connect } from "react-redux";
import { updateData } from "Store/Roster/action";

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branchOptions: {
        placeholder: "选择支部",
        options: []
      },
      gradeOptions: {
        placeholder: "选择年级",
        options: []
      }
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

  handleGrade = grade => {
    this.props.updateData({ gradeValue: grade });
  };

  handleBranch = branch => {
    this.props.updateData({ branchValue: branch });
  };

  handleExport = () => {
    //导出文件
    Get(
      this.props.path + EXPORTURL,
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
          defaultValue={this.props.gradeValue}
          handleChange={this.handleGrade}
          selection={this.state.gradeOptions}
        />
        <Selection
          defaultValue={this.props.branchValue}
          handleChange={this.handleBranch}
          selection={this.state.branchOptions}
        />
        <Button type="primary" onClick={this.handleExport}>
          导出
        </Button>
        {this.props.path === "/roster/all" ? (
          <MyModal branchOptions={this.state.branchOptions} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default connect(
  state => ({
    branchValue: state.rosterData.branchValue,
    gradeValue: state.rosterData.gradeValue,
    path: state.rosterData.path
  }),
  { updateData }
)(Option);
