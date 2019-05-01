import React from "react";
import TableList from "Components/TableList";
import Option from "Components/Option";
import "./index.less";


class Roster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      path: "",
      visible: false
    };
  }

  componentWillMount() {
    /* 更新数据 */
    this._initRoster(this.props.fullPath);
  }

  componentWillReceiveProps(nextProps) {
    this._initRoster(nextProps.fullPath);
  }

  _initRoster(path) {
    this.setState({
      path
    });
  }

  handleGrade = grade => {
    this.setState({
      params: {
        ...this.state.params,
        grade
      }
    });
    console.log(grade);
  };

  handleBranch = branch => {
    this.setState({
      params: {
        ...this.state.params,
        branch
      }
    });
  };



  render() {
    return (
      <div className="roster">
        <Option
          href={this.props.href}
          visible={this.state.visible}
          fullPath={this.props.fullPath}
          handleGrade={this.handleGrade}
          handleBranch={this.handleBranch}
          handleSelectGroup={this.handleSelectGroup}
        />
        <TableList {...this.state} />
      </div>
    );
  }
}

export default Roster;
