import React from "react";
import List from "Components/List";
import { Get } from "Public/js/Ajax";
import { MATERIALURL } from "Public/js/Api";
import "./index.less";


class Material extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            materials: []
        }
    }

    componentWillMount () {
            Get(
              MATERIALURL,
              {},
              res => {
                  this.setState({ materials: res.data})
                  console.log(res)
              },
              err => {
                console.log(err);
              }
            );
          
    }

    render () {
        return (
            <div className="material">
                <List list={this.state.materials} />
            </div>
        )
    }
} 
export default Material;
