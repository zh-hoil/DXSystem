import React from "react";
import ThemeDoc from "./themeDoc";
import { getTargetAttr } from "Src/utils";
import { List } from "antd-mobile";
import PropTypes from "prop-types";
import "./index.less";

const ThemeDocs = props => (
    <div className="list">
        <List onClick={props.onClick}>
            {props.themeList.map((theme, i) => (
                <List.Item key={i}>
                    <ThemeDoc {...theme} />
                </List.Item>
            ))}
        </List>
    </div>
)
ThemeDocs.propsType = {
    themeList: PropTypes.array
};

export default ThemeDocs;
