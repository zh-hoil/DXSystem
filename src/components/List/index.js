import React from "react";
import "./index.less";
import PropTypes from "prop-types";

const List = props => (
  <div className="list">
    <div className="list-title">{props.title}</div>
    <ul className="list-content">
      {props.list.map((item, index) => (
        <li key={index} className="list-item">
          <a href={item.href}>{item.title}</a>
        </li>
      ))}
    </ul>
  </div>
);
List.propsType = {
  list: PropTypes.array.isRequired
};

export default List;
