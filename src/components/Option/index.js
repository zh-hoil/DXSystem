import React from "react";
import "./index.less";
import { Button, Input } from "antd";
import Selection from "Components/Selection";
import MyModal from "Components/MyModal";
import { Get } from "Public/js/Ajax";
import {
  GRADEURL,
  BRANCHURL,
  EXPORTURL,
  READYURL,
  CONFIRMURL
} from "Public/js/Api";
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
      },
      readyOptions: {
        placeholder: "选择入党时间",
        options: []
      }
    };
  }

  componentWillMount() {
    this._initGrade();
    this._initBranch();
    // this._initReady();
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

  // _initReady = () => {
  //   Get(
  //     READYURL,
  //     {},
  //     res => {
  //       this.setState({
  //         readyOptions: {
  //           ...this.state.readyOptions,
  //           options: res.data
  //         }
  //       });
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // };

  //选择年级
  handleGrade = grade => {
    this.props.updateData({ gradeValue: grade });
  };

  //选择支部
  handleBranch = branch => {
    this.props.updateData({ branchValue: branch });
  };

  //学号输入查询
  handleSelect = e => {
    let id = e.target.value;
    this.props.updateData({ id });
  };

  //导出
  handleExport = () => {
    let file = this.props.path.split("/")[2];
    //导出文件
    Get(
      EXPORTURL,
      { file },
      res => {
        let blob = new Blob([res], {
          type: "application/vnd.ms-excel;charset=utf-8"
        });
        console.log(blob);
        let url = window.URL.createObjectURL(blob); //表示一个指定的file对象或Blob对象
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = file; //命名下载名称
        a.click(); //点击触发下载
        window.URL.revokeObjectURL(url); //下载完成进行释放
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
          value={"grade"}
        />
        <Selection
          defaultValue={this.props.branchValue}
          handleChange={this.handleBranch}
          selection={this.state.branchOptions}
          value={"branch"}
        />
        {/* <Selection
          defaultValue={this.props.readyValue}
          handleChange={this.handleReady}
          selection={this.state.readyOptions}
        /> */}
        <Button type="primary" onClick={this.handleExport}>
          导出
        </Button>
        {this.props.path === "/roster/all" ? (
          <div className="find">
            <MyModal
              path={this.props.path}
              accept={".xlsx, .xls"}
              confirmUrl={CONFIRMURL}
            />
            <Input
              placeholder="请输入学号进行查询"
              onBlur={this.handleSelect}
            />
          </div>
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
    readyValue: state.rosterData.readyValue,
    id: state.rosterData.id,
    path: state.rosterData.path
  }),
  { updateData }
)(Option);
