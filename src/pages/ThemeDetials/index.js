import React from "react";
import { Button } from 'antd-mobile';
class ThemeDetials extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount () {
        console.log(this.props.match.params.theme_id)
    }
    render() {
        return (
            <div>
                <Button type="primary">primary</Button>
                这里是主题详情页
            </div>
        );
    }
}
export default ThemeDetials;
