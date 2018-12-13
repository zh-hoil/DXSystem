import React from "react";
import "./index.less";
import PropTypes from "prop-types";
class Grade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grade: -1
        }
    }

    handlePraise= (grade)=> {
        if(this.props.triggerGrade) {
            this.props.triggerGrade(grade + 1)
        }
        this.setState({
            grade: grade
        })
    }

    render() {
        let stars = [0, 1, 2, 3, 4]
        return (
            <div className="grade">
                {
                    stars.map((i, index) => (
                        <span key={index} onClick={()=>{this.handlePraise(index)}}>
                            {index<=this.state.grade?"⭐":"✩"}
                        </span>
                    ))
                }
            </div>
        )
    }
}

export default Grade;
