import React from "react";
import { Select } from "antd";
import "./index.less";

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: undefined
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  // }

  render() {
    return (
      <div className="selection">
        <Select
          value={this.props.defaultValue}
          placeholder={this.props.selection.placeholder}
          onChange={this.props.handleChange}
        >
          {this.props.selection.options.map((option, index) => (
            <Select.Option key={index} value={option.text}>
              {option.text}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}

export default Selection;
