import React from "react";
import "./index.less";
import PropTypes from "prop-types";

const List = props => (
  <div className="list">
  {
    props.title?(<div className="list-title">{props.title}</div>):""
  }
    <ul className="list-content">
      {props.list.map((item, index) => (
        <li key={index} className="list-item">
        <span>※</span>
          <a href={item.href}>{item.title}</a>
        </li>
      ))}
    </ul>
  </div>
);
List.propsType = {
  title: PropTypes.string,
  list: PropTypes.array.isRequired
};

export default List;
