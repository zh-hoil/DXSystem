import React from "react";
import List from "Components/List";
import { Get } from "Public/js/Ajax";
import { HISTORYURL } from "Public/js/Api";
import "./index.less";


class Material extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            history: []
        }
    }

    componentWillMount () {
            Get(
              HISTORYURL,
              {},
              res => {
                  this.setState({ history: res.data})
                  console.log(res)
              },
              err => {
                console.log(err);
              }
            );
          
    }

    render () {
        return (
            <div className="history">
                <List list={this.state.history} />
            </div>
        )
    }
} 
export default Material;
