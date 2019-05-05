import React from "react";
import { Get } from "Public/js/Ajax";
import { STRUCTUREURL } from "Public/js/Api";
import echarts from "echarts";
import { message } from "antd";
import "./index.less";

class Structure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      apply: {},
      active: {},
      ready: {},
      approved: {},
      option_main: {},
      option_1: {},
      option_2: {},
      option_3: {},
      option_4: {}
    };
  }

  componentWillMount() {
    Get(
      STRUCTUREURL,
      {},
      res => {
        if (res.code === 200) {
          this.setState({
            ...res.data
          });

          this._initOption();
          this.setChart();
          console.log(this.state);
        } else {
          message.error(res.msg);
        }
      },
      err => {
        throw err;
      }
    );
  }

  setChart() {
    // 基于准备好的dom，初始化echarts实例
    var chart_main = echarts.init(document.getElementById("chart_main"));
    var chart_1 = echarts.init(document.getElementById("chart_1"));
    var chart_2 = echarts.init(document.getElementById("chart_2"));
    var chart_3 = echarts.init(document.getElementById("chart_3"));
    var chart_4 = echarts.init(document.getElementById("chart_4"));

    // 绘制图表
    chart_main.setOption(this.state.option_main);
    chart_1.setOption(this.state.option_1);
    chart_2.setOption(this.state.option_2);
    chart_3.setOption(this.state.option_3);
    chart_4.setOption(this.state.option_4);
  }

  _init(data) {
    let keyArr = Object.keys(data).slice(1);
    let result = [];
    keyArr.forEach(item => {
      result.push({ name: item, value: data[item] });
    });
    return result;
  }

  _initOption() {
    let legendData = [
      "入党申请",
      "积极分子",
      "预备党员",
      "正式党员",
      ...Object.keys(this.state.apply).slice(1),
      ...Object.keys(this.state.active).slice(1),
      ...Object.keys(this.state.ready).slice(1),
      ...Object.keys(this.state.approved).slice(1)
    ];

    let seriesData = [
      {
        value: this.state.apply.count,
        name: "入党申请",
        selected: true
      },
      { value: this.state.active.count, name: "积极分子" },
      { value: this.state.ready.count, name: "预备党员" },
      { value: this.state.approved.count, name: "正式党员" }
    ];

    let gradeData = [];
    gradeData = gradeData.concat(this._init(this.state.apply));
    gradeData = gradeData.concat(this._init(this.state.active));
    gradeData = gradeData.concat(this._init(this.state.ready));
    gradeData = gradeData.concat(this._init(this.state.approved));

    const option_main = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: legendData
      },
      series: [
        {
          name: "党员情况",
          type: "pie",
          selectedMode: "single",
          radius: [0, "30%"],

          label: {
            normal: {
              position: "inner"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: seriesData
        },
        {
          name: "年级分布",
          type: "pie",
          radius: ["40%", "55%"],
          label: {
            normal: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
          data: gradeData
        }
      ]
    };
    const option_1 = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name: "入党详情",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: "inner"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 225, name: "入党申请" },
            { value: 139, name: "积极分子" },
            { value: 85, name: "预备党员" },
            { value: 52, name: "正式党员" }
          ]
        }
      ]
    };
    const option_2 = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name: "入党详情",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: "inner"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 225, name: "入党申请" },
            { value: 139, name: "积极分子" },
            { value: 85, name: "预备党员" },
            { value: 52, name: "正式党员" }
          ]
        }
      ]
    };
    const option_3 = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name: "入党详情",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: "inner"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 225, name: "入党申请" },
            { value: 139, name: "积极分子" },
            { value: 85, name: "预备党员" },
            { value: 52, name: "正式党员" }
          ]
        }
      ]
    };
    const option_4 = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name: "入党详情",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: "inner"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 225, name: "入党申请" },
            { value: 139, name: "积极分子" },
            { value: 85, name: "预备党员" },
            { value: 52, name: "正式党员" }
          ]
        }
      ]
    };
    this.setState({ option_main, option_1, option_2, option_3, option_4 });
  }

  render() {
    return (
      <div className="structure">
        <div id="chart_main" />
        <div className="details">
          <div id="chart_1" />
          <div id="chart_2" />
          <div id="chart_3" />
          <div id="chart_4" />
        </div>
      </div>
    );
  }
}
export default Structure;
