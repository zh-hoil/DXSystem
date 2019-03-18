import React from "react";
import { Layout } from "antd";
// import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Slider from "Components/Slider";
import Swipper from "Components/Swipper";
import List from "Components/List";
// import banner1 from "Assets/images/banner1.jpg";
// import banner2 from "Assets/images/banner2.png";
import "./index.less";

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        news: [
            {
                href: "http://www.baidu.com",
                title: "这里是测试新闻信息"
            },
            {
                href: "http://www.baidu.com",
                title: "这里是测试新闻信息"
            },
            {
                href: "http://www.baidu.com",
                title: "这里是测试新闻信息"
            },
            {
                href: "http://www.baidu.com",
                title: "这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息"
            },
            {
                href: "http://www.baidu.com",
                title: "这里是测试新闻信息"
            },
            {
                href: "http://www.baidu.com",
                title: "这里是测试新闻信息"
            }
        ]
    };
  }

  handleKey = (item) => {
    let keyPath = item.keyPath;
    let path = "";
    for(let i=keyPath.length-1; i>=0; i--){
        path += "/" + keyPath[i];
    }
    console.log(path)
  };

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
                <Swipper  />
                <div className="news" style={{display: "flex"}}>
                    <List title="国家要闻" list={this.state.news} />
                    <List title="学院动态" list={this.state.news} />
                </div>
                
            </Content>
            <Footer style={{ textAlign: "center" }}>
              计算机与通信工程学院
            </Footer>
          </Layout>
        </Layout>
    );
  }
}

export default Home;
