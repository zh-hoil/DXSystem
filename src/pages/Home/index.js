import React from "react";
import { Layout } from "antd";
import Slider from "Components/Slider";
import News from "Pages/News";
import Material from "Pages/Material";
import Roster from "Pages/Roster";
import Structure from "Pages/Structure";
import Table from "Pages/Table";
import History from "Pages/History";
import "./index.less";

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curPath: "",
      path: "",
      fullPath: ""
    };
  }

  componentWillMount() {
    this._initContent();
  }

  /* 初始化content内容 */
  _initContent() {
    this.setState({ path: "news" });
  }

  /* 导航菜单选择  */
  handleKey = item => {
    let keyPath = item.keyPath;
    let curPath = item.key;
    let path = keyPath[keyPath.length - 1];
    let fullPath = "";
    for (let i = keyPath.length - 1; i >= 0; i--) {
      fullPath += "/" + keyPath[i];
    }
    if (this.state.curPath !== curPath) {
      this.setState({
        curPath,
        path,
        fullPath
      });
    }
  };

  /* 更改content内容 */
  _changeContent() {
    let contentComponent = null;
    switch (this.state.path) {
      case "structure":
        contentComponent = <Structure path={this.state.fullPath} />;
        break;
      case "material":
        contentComponent = <Material path={this.state.fullPath} />;
        break;
      case "history":
        contentComponent = <History path={this.state.fullPath} />;
        break;
      case "roster":
        contentComponent = <Roster fullPath={this.state.fullPath} />;
        break;
      case "table":
        contentComponent = <Table fullPath={this.state.fullPath} />;
        break;
      default:
        contentComponent = <News path={this.state.fullPath} />;
    }
    return contentComponent;
  }

  render() {
    return (
      <div className="home">
        <Layout>
          <Slider handleKey={this.handleKey} />
          <Layout>
            <Header
              style={{
                background: "#fff",
                padding: 0,
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
                letterSpacing: "4px"
              }}
            >
              党校数据管理系统
            </Header>
            <Content>{this._changeContent()}</Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Home;
