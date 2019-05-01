import React from "react";
import { Select } from "antd";
import "./index.less";

const Selection = props => (
  <div className="selection">
    <Select
      placeholder={props.selection.placeholder}
      onChange={props.handleChange}
    >
      {props.selection.options.map((option, index) => (
        <Select.Option key={index} value={option.text}>
          {option.text}
        </Select.Option>
      ))}
    </Select>
  </div>
);

export default Selection;
