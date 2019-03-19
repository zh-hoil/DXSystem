import React from "react";
import { Layout } from "antd";
import Slider from "Components/Slider";
import News from "Pages/News";
import "./index.less";

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: ""
    };
  }

  componentWillMount() {
    this._initContent();
  }

  _initContent() {
    this.setState({ path: "/news" });
  }

  handleKey = item => {
    let keyPath = item.keyPath;
    let path = "";
    for (let i = keyPath.length - 1; i >= 0; i--) {
      path += "/" + keyPath[i];
    }
    if (this.state.path !== path) {
      this.setState({
        path
      });
    }
  };

  _changeContent() {
    if (this.state.path === "/news") {
      return <News />;
    } else {
      return <div>asfsadf</div>;
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
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
          <Content style={{ padding: "0 16px" }}>
            {this._changeContent()}
          </Content>
          <Footer style={{ textAlign: "center" }}>计算机与通信工程学院</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
