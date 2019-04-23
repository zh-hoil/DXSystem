import React from "react";
import Swipper from "Components/Swipper";
import List from "Components/List";
import { Get } from "Public/js/Ajax";
import NEWSURL from "Public/js/Api";
import "./index.less";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nationNews: [
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
          title:
            "这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息"
        },
        {
          href: "http://www.baidu.com",
          title: "这里是测试新闻信息"
        },
        {
          href: "http://www.baidu.com",
          title: "这里是测试新闻信息"
        }
      ],
      schoolNews: [
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
          title:
            "这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息这里是测试新闻信息"
        },
        {
          href: "http://www.baidu.com",
          title: "这里是测试新闻信息"
        },
        {
          href: "http://www.baidu.com",
          title: "这里是测试新闻信息"
        }
      ],
      images: [
        {
          href: "http://www.ccps.gov.cn/tpxw/201903/t20190319_130453.shtml",
          src: "http://www.ccps.gov.cn/tpxw/201903/W020190319330769048334.jpg",
          title: "习近平主持召开学校政治思想理论课教师座谈会"
        },
        {
          href: "http://www.ccps.gov.cn/tpxw/201903/t20190308_130234.shtml",
          src: "http://www.ccps.gov.cn/tpxw/201903/W020190308340308115698.jpg",
          title: "中央党校新建雕塑巡礼"
        },
        {
          href: "http://www.ccps.gov.cn/tpxw/201812/t20181230_127620.shtml",
          src: "http://www.ccps.gov.cn/tpxw/201812/W020181230579277128887.jpg",
          title: "中共中央党校庆祝改革开放40周年文艺汇演"
        },
        {
          href: "http://www.ccps.gov.cn/zt/jgzf/",
          src: "http://www.ccps.gov.cn/tpxw/201903/W020190308431808421293.jpg",
          title: "中央党校女职工风采"
        }
      ]
    };
  }

  componentWillMount () {
    // Get(
    //   NEWSURL,
    //   {},
    //   res => {
        // let { nationNews, schoolNews, images } = res.data;
    //       this.setState({ nationNews, schoolNews, images })
    //       console.log(res)
    //   },
    //   err => {
      // message.error(err.message);
    //     console.log(err);
    //   }
    // );
  }

  render() {
    return (
      <div className="news">
        <Swipper images={this.state.images} />
        <div className="news-content">
          <List title="国家要闻" list={this.state.nationNews} />
          <List title="学院动态" list={this.state.schoolNews} />
        </div>
      </div>
    );
  }
}
export default News;
