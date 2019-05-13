import React from "react";
import { Get } from "Public/js/Ajax";
import { STRUCTUREURL, STRUCTUREDETAILSURL } from "Public/js/Api";
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
      options: [],
      branches: {}
    };
  }

  componentWillMount() {
    Get(
      STRUCTUREURL,
      {},
      res => {
        if (res.code === 200) {
          this.setState({
            ...this.state,
            ...res.data
          });

          this._initMainOptions();
          this.setMainChart();
        } else {
          message.error(res.msg);
        }
      },
      err => {
        throw err;
      }
    );
    Get(
      STRUCTUREDETAILSURL,
      {},
      res => {
        if (res.code === 200) {
          this.setState({
            ...this.state,
            branches: res.data
          });

          this._initDetailsOptions();
          this.setDetailsChart();
        } else {
          message.error(res.msg);
        }
      },
      err => {
        throw err;
      }
    );
  }

  _init(data) {
    let keyArr = Object.keys(data).slice(1);
    let result = [];
    keyArr.forEach(item => {
      result.push({ name: item, value: data[item] });
    });
    return result;
  }

  setDetailsChart() {
    // 基于准备好的dom，初始化echarts实例
    this.state.options.map((item, index) => {
      let temp = echarts.init(document.getElementById(`chart_${index + 1}`));
      temp.setOption(this.state.options[index]);
    });
  }

  setMainChart = () => {
    let chart_main = echarts.init(document.getElementById("chart_main"));
    chart_main.setOption(this.state.option_main);
  };

  _initDetailsOptions() {
    Object.keys(this.state.branches).map((item, index) => {
      let temp = {
        title: {
          text: item,
          x: "center",
          y: "bottom"
        },
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
              {
                value: this.state.branches[item].apply,
                name: "入党申请"
              },
              {
                value: this.state.branches[item].active,
                name: "积极分子"
              },
              {
                value: this.state.branches[item].ready,
                name: "预备党员"
              },
              { value: this.state.branches[item].approved, name: "正式党员" }
            ]
          }
        ]
      };
      this.setState({
        ...this.state,
        options: [...this.state.options, temp]
      });
    });
  }

  _initMainOptions = () => {
    let legendData = [
      "入党申请",
      "积极分子",
      "预备党员",
      "正式党员",
      ...Object.keys(this.state.apply).slice(1),
      ...Object.keys(this.state.active).slice(1),
      ...Object.keys(this.state.ready).slice(1),
      ...Object.keys(this.state.approved).slice(1),
      "其他"
    ];

    let seriesData = [
      {
        value: this.state.apply.count,
        name: "入党申请",
        selected: true
      },
      { value: this.state.active.count, name: "积极分子" },
      { value: this.state.ready.count, name: "预备党员" },
      { value: this.state.approved.count, name: "正式党员" },
      {
        value:
          this.state.total -
          this.state.approved.count -
          this.state.active.count -
          this.state.ready.count,
        name: "其他"
      }
    ];

    let gradeData = [];
    gradeData = gradeData.concat(this._init(this.state.apply));
    gradeData = gradeData.concat(this._init(this.state.active));
    gradeData = gradeData.concat(this._init(this.state.ready));
    gradeData = gradeData.concat(this._init(this.state.approved));
    gradeData = gradeData.concat(
      this._init({
        count:
          this.state.total -
          this.state.approved.count -
          this.state.active.count -
          this.state.ready,
        其他:
          this.state.total -
          this.state.approved.count -
          this.state.active.count -
          this.state.ready.count
      })
    );
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
    this.setState({ option_main });
  };

  render() {
    return (
      <div className="structure">
        <div id="chart_main" />
        <div className="details">
          {Object.keys(this.state.branches).map((item, index) => (
            <div key={index} id={`chart_${index + 1}`} />
          ))}
        </div>
      </div>
    );
  }
}
export default Structure;
