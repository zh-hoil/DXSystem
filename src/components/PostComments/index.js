import React from "react";
import comment from 'Assets/images/comment.png'; 
import "./index.less";
class PostComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidUpdate () {
        if(this.state.open) {
            this.autoFocusInst.focus()
        }
    }

    handlePraiseDetail() {
        window.location.hash = "/praiseDetail";
    }

    handleOpenComment() {
        this.setState({
            open: !this.state.open
        })
    }

    handleCancel () {
        this.setState({
            open: !this.state.open
        })
    }

    handleConfirm () {
        this.setState({
            open: !this.state.open
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
                                    <span className="mark-star">⭐⭐⭐⭐⭐</span>
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
                                <span className="icon" style={{background: `url(${comment}) no-repeat`, backgroundSize: "25px"}} onClick={this.handlePraiseDetail.bind(this)}></span>
                                {this.props.comments.length}
                            </div>
                        )
                }
            </div>
        )
    }
}
export default PostComments;
