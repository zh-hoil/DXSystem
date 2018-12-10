import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateTitle } from "Store/Home/action";
import Banner from "Components/Banner";
import { updateAppTitle } from "Public/js/JSBridge";
import HomeMenu from "./HomeMenu";
import banner1 from "Assets/images/banner1.jpg";
import banner2 from "Assets/images/banner2.jpg";
import banner3 from "Assets/images/banner3.jpg";
import "./index.less";

const List = [
    {
        path: banner1,
        name: "img1",
        id: "1"
    },
    {
        path: banner2,
        name: "img2",
        id: "2"
    },
    {
        path: banner3,
        name: "img3",
        id: "3"
    }
];
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        updateAppTitle("NC一线牵");
    }
    componentDidMount() {}
    render() {
        return (
            <div className="home">
                <div className="home_banner">
                    <Banner banerList={List} />
                </div>
                <HomeMenu />
            </div>
        );
    }
}
Home.propTypes = {
    title: PropTypes.string.isRequired
};
export default connect(
    state => ({
        title: state.homeData.title
    }),
    { updateTitle }
)(Home);
