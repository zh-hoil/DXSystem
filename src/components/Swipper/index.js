import React from "react";
import { Carousel, Popover } from "antd";
import "./index.less";
const Swipper = props => (
  <div className="carousel">
    <Carousel autoplay>
      {props.images.map((item, index) => (
        <div key={index} className="banner">
            <a href={item.href} title={item.title} alt={item.title}>
              <img src={item.src} alt={item.title} />
            </a>
        </div>
      ))}
    </Carousel>
  </div>
);
export default Swipper;
