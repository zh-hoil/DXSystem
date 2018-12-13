import React from "react";
import Grade from "./grade";
import { Toast } from "antd-mobile";
import "./index.less";
class QuickComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            grade: "0"
        };
    }
    handleOpenComment = () => {
        let { open } = this.state;
        this.setState({
            open: !open
        });
    };
    handleCancel = () => {
        this.autoFocusInst.value = "";
        this.setState({
            open: false
        });
    };
    handleOk = () => {
        let content = this.autoFocusInst.value;
        let star = this.state.grade;
        if (!content) {
            Toast.info("请输入评论内容!", 1);
            return;
        }
        if (star <= 0) {
            Toast.info("请打分!", 1);
            return;
        }
        this.props.onOk({
            content,
            star
        },this.handleCancel);
    };
    getGrade = grade => {
        this.setState({
            grade: String(grade)
        });
    };
    // 点击图标跳转
    handlePraiseDetail = () => {
        this.props.openToPraiseDetail ? this.props.openToPraiseDetail() : null;
    };
    render() {
        if (!this.state.open) {
            return (
                <div className="quick_comments">
                    <div
                        className="comment_input"
                        onClick={this.handleOpenComment}
                    >
                        写评论
                    </div>
                    <div className="comment_icon">
                        <span
                            className="iconfont icon-xiaoxi"
                            onClick={this.handlePraiseDetail}
                        />
                        <span>{this.props.commentsCount}</span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="post_quick_comment">
                    <div className="comment_container">
                        <div className="mark">
                            <span className="mark_text">请为该主题打分</span>
                            <Grade triggerGrade={this.getGrade} />
                        </div>
                        <textarea
                            ref={ref => (this.autoFocusInst = ref)}
                            className="writting"
                            placeholder="写评论(100字以内)"
                        />
                        <div className="buttons">
                            <span
                                className="cancel_button"
                                onClick={this.handleCancel}
                            >
                                取消
                            </span>
                            <span
                                className="confirm_button active"
                                onClick={this.handleOk}
                            >
                                确认
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default QuickComments;
