import React from "react";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import "./index.less";
class Banner extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        let newSwiper = new Swiper(".swiper-container", {
            autoplay: {
                delay: 3000,
                speed: 2000
            },
            loop: true,
            preventLinksPropagation: true,
            pagination: {
                el: ".swiper-pagination"
            },
            on: {
                click: function() {
                    console.log(this.activeIndex);
                }
            }
        });
    }
    render() {
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {this.props.banerList.map(item => {
                        return (
                            <div
                                key={item.id}
                                className="swiper-slide"
                                data-item={item.name}
                                style={{
                                    background: `url(${
                                        item.path
                                    }) no-repeat center center`,
                                    backgroundSize: "100% 100%"
                                }}
                            />
                        );
                    })}
                </div>
                <div className="swiper-pagination" />
            </div>
        );
    }
}
export default Banner;
