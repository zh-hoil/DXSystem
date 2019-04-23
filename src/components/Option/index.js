import React from "react";
import "./index.less";
import { Button } from "antd";
import Selection from "Components/Selection";
import MyModal from "Components/MyModal";

const gradeOptions = {
  placeholder: "选择年级",
  options: [
    { value: "15", text: "15级" },
    { value: "16", text: "16级" },
    { value: "17", text: "17级" },
    { value: "18", text: "18级" }
  ]
};
const groupOptions = {
  placeholder: "选择支部",
  options: [
    { value: "computer_1", text: "计算机类第一党支部" },
    { value: "computer_2", text: "计算机类第二党支部" },
    { value: "electrical_1", text: "电子信息类第一党支部" },
    { value: "electrical_2", text: "电子信息类第二党支部" }
  ]
};
const Option = props => (
  <div className="options">
    <span className="tip">请选择筛选条件：</span>
    <Selection handleChange={props.handleGrade} selection={gradeOptions} />
    <Selection handleChange={props.handleGroup} selection={groupOptions} />
    <Button type="primary" href={props.href}>
      导出
    </Button>
    {props.fullPath === "/roster/all" ? (
      <MyModal groupOptions={groupOptions} />
    ) : (
      ""
    )}
  </div>
);

export default Option;
