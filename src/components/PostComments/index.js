import React from "react";
import comment from 'Assets/images/comment.png';
import Grade from "./grade"
import "./index.less";
import { userId, Get, Post } from "Public/js/Ajax";
import { Toast } from 'antd-mobile';

const COMMENTOPICURL = "/commentTopic";
class PostComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false, //是否打开评论弹窗
            grade: "0"   //评价分数/星级
        }
    }

    componentDidUpdate() {
        if (this.state.open) {
            this.autoFocusInst.focus()
        }
    }

    getGrade (grade) {
        this.setState({
            grade: String(grade)
        })
    }

    handlePraiseDetail() {
        window.location.hash = "/praiseDetail";
    }

    handleOpenComment() {
        this.setState({
            open: true
        })
    }

    handleCancel() {
        this.setState({
            open: false
        })
    }

    handleConfirm() {
        //发送评论请求
        let themeId = this.props.themeId;
        let content = this.autoFocusInst.value;
        let star = this.state.grade;
        if(!content) {
            Toast.info("请输入评论内容!", 1);
            return 
        }

        if(star <= 0) {
            Toast.info("请打分!", 1);
            return 
        }
        
        Post(COMMENTOPICURL, {
            userId: userId,
            themeId: themeId,
            content: content,
            star: star
        }, (res) => {
            this.autoFocusInst.value = "";
            this.setState({
                open: false
            })
            Toast.success(res.message, 1, () => {
                //刷新页面以及时显示评论
                window.location.reload()
            })
            console.log("这里是评论成功的数据")
            console.log(res.message)
        }, (err) => {
            Toast.fail("error")
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.open ?
                        (
                            <div className="post-comment">
                                <div className="mark">
                                    <span className="mark-text">请为该主题打分</span>
                                    <span className="mark-star">
                                        <Grade triggerGrade={this.getGrade.bind(this)}/>
                                    </span>
                                </div>
                                <textarea ref={ref => this.autoFocusInst = ref} className="writting" placeholder="写评论(100字以内)"></textarea>
                                <div className="buttons">
                                    <span onClick={this.handleCancel.bind(this)}>取消</span>
                                    <span>|</span>
                                    <span className="active" onClick={this.handleConfirm.bind(this)}>确认</span>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="details-bottom">
                                <div className="comment-input" onClick={this.handleOpenComment.bind(this)}>写评论</div>
                                <span className="icon" style={{ background: `url(${comment}) no-repeat`, backgroundSize: "25px" }} onClick={this.handlePraiseDetail.bind(this)}></span>
                                {this.props.count}
                            </div>
                        )
                }
            </div>
        )
    }
}

export default PostComments;
