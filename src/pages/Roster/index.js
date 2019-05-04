import React from "react";
import TableList from "Components/TableList";
import Option from "Components/Option";
import { connect } from "react-redux";
import { updateData } from "Store/Roster/action";
import "./index.less";

class Roster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      visible: false
    };
  }

  componentWillMount() {
    /* 更新数据 */
    this._initRoster(this.props.fullPath);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullPath === nextProps.path) {
    } else {
      this.props.updateData({
        path: nextProps.fullPath,
        branchValue: undefined,
        gradeValue: undefined,
        readyValue: undefined
      });
    }
  }

  _initRoster(path) {
    this.props.updateData({ path: path });
  }

  render() {
    return (
      <div className="roster">
        <Option
          visible={this.state.visible}
          handleGrade={this.handleGrade}
          handleBranch={this.handleBranch}
        />
        <TableList />
      </div>
    );
  }
}

export default connect(
  state => ({
    branchValue: state.rosterData.branchValue,
    gradeValue: state.rosterData.gradeValue,
    readyValue: state.rosterData.readyValue,
    path: state.rosterData.path
  }),
  { updateData }
)(Roster);
