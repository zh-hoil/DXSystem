import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Toast } from "antd-mobile";
import Tag from "Components/Tag";
import Time from "Components/Time";
import Like from "Components/Like";
import Praise from "Components/Praise";
import { Post } from "Public/js/Ajax";
const GOODTOPICURL = "/goodTopic"; //主题点赞接口
class ThemeDescribe extends React.Component {
    constructor(props) {
        super(props);
    }
    //点赞操作
    handlePraise = () => {
        Post(
            GOODTOPICURL,
            {
                themeId: this.props.themeId
            },
            res => {
                Toast.success(res.message, 0.5, () => {
                    this.props.onPraise();
                });
            }
        );
    };

    render() {
        let {
            title,
            type,
            creator,
            time,
            version,
            status,
            follow,
            favorw,
            favorwnum
        } = this.props.detailsData;
        return (
            <div className="theme-describe">
                <span className="theme-details-title">{title}</span>
                <div className="remarks">
                    <div className="detail_info">
                        <Tag type={type} />
                        <Time time={time} />
                    </div>
                    <div className="detail">
                        <div className="detail_item">
                            <label>负责人</label>
                            <span>{creator}</span>
                        </div>
                    </div>
                    <div className="detail">
                        <div className="detail_item">
                            <label>版本</label>
                            <span>{version}</span>
                        </div>
                    </div>
                    <div className="detail">
                        <div className="detail_item">
                            <label>状态</label>
                            <span>{status}</span>
                        </div>
                        <div className="operation">
                            <Like
                                onClick={this.props.onFollow}
                                follow={follow}
                            />
                            <Praise
                                themeId={this.props.themeId}
                                favorw={favorw}
                                favorwnum={Number(favorwnum)}
                                onClick={this.handlePraise}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ThemeDescribe.propTypes = {
    themeId: PropTypes.string.isRequired
};
export default connect(
    store => ({
        themeId: store.themeDetailsData.themeId
    }),
    {}
)(ThemeDescribe);
