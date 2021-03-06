import React from "react";
import Swipper from "Components/Swipper";
import List from "Components/List";
import { Get } from "Public/js/Ajax";
import { NEWSURL } from "Public/js/Api";
import { message } from "antd";
import "./index.less";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nationNews: [],
      schoolNews: [],
      images: []
    };
  }

  componentWillMount() {
    Get(
      NEWSURL,
      {},
      res => {
        console.log(res.data);
        if (res.code === 200) {
          let { nationNews, schoolNews, images } = res.data;
          this.setState({
            nationNews,
            schoolNews,
            images
          });
        } else {
          message.error(res.msg);
        }
      },
      err => {
        throw err;
      }
    );
  }

  render() {
    return (
      <div className="news">
        <Swipper images={this.state.images} />
        <div className="news-content">
          <List title="国家要闻" list={this.state.nationNews} />
          <List title="学校动态" list={this.state.schoolNews} />
        </div>
      </div>
    );
  }
}
export default News;
