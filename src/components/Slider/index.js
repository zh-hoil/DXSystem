import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon, Layout } from "antd";
import Logo from "Assets/images/logo.jpg";
import "./index.less";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const Slider = props => (
    <Sider collapsible>
      <div className="logo" style={{textAlign: "center", color: "#fff"}}>
        {/* <img style={{width: "100%", height: "100%"}} src={Logo} /> */}
        
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["news"]}
        mode="inline"
        onClick={props.handleKey}
      >
        <Menu.Item key="news">
          <Icon type="pie-chart" />
          <span>新闻要点</span>
        </Menu.Item>
        <Menu.Item key="structure">
          <Icon type="desktop" />
          <span>组织架构</span>
        </Menu.Item>
        <Menu.Item key="history">
          <Icon type="file" />
          <span>历史文件</span>
        </Menu.Item>
        <Menu.Item key="material">
          <Icon type="file" />
          <span>参考资料</span>
        </Menu.Item>
        <SubMenu
          key="roster"
          title={
            <span>
              <Icon type="team" />
              <span>名单统计</span>
            </span>
          }
        >
          <Menu.Item key="all">党建大表</Menu.Item>
          <Menu.Item key="activist">积极分子</Menu.Item>
          <Menu.Item key="ready">预备党员</Menu.Item>
          <Menu.Item key="approved">正式党员</Menu.Item>
        </SubMenu>
        <SubMenu
          key="table"
          title={
            <span>
              <Icon type="team" />
              <span>所有表格</span>
            </span>
          }
        >
          <Menu.Item key="table_1">表一</Menu.Item>
          <Menu.Item key="table_2">表二</Menu.Item>
          <Menu.Item key="table_3">表三</Menu.Item>
          <Menu.Item key="table_4">表四</Menu.Item>
          <Menu.Item key="publicity">公示材料</Menu.Item>
          <Menu.Item key="graduated">毕业生转出</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
);
Slider.propsType = {
  handleKey: PropTypes.func.isRequired
};

export default Slider;
