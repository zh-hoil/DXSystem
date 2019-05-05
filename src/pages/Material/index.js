import React from "react";
import List from "Components/List";
import MyModal from "Components/MyModal";
import { Get } from "Public/js/Ajax";
import { MATERIALURL, CONFIRMURL } from "Public/js/Api";
import "./index.less";

class Material extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materials: []
    };
  }

  componentWillMount() {
    Get(
      MATERIALURL,
      {},
      res => {
        this.setState({ materials: res.data });
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  render() {
    return (
      <div className="material">
        <MyModal path={this.props.path} accept={"*"} confirmUrl={CONFIRMURL} />
        <List list={this.state.materials} />
      </div>
    );
  }
}
export default Material;
