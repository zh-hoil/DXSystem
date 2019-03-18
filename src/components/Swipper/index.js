import React from "react";
import { Carousel } from 'antd';
import "./index.less";
class Swipper extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        
    }
    
    render() {
        return (
            <div className="carousel">
               <Carousel autoplay>
                    <div><h3>图文新闻1</h3></div>
                    <div><h3>图文新闻2</h3></div>
                    <div><h3>图文新闻3</h3></div>
                    <div><h3>图文新闻4</h3></div>
                </Carousel>
            </div>
        );
    }
}
export default Swipper;
