import React from "react";
import './index.less';
class Loading extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return <div className='spin'>
            <span className='spin-dot'>
                Loading
            </span>
        </div>;
    }
}
export default Loading;
