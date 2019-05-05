import React from "react";
import "./index.less";
import { Get, Put, Delete } from "Public/js/Ajax";
import { DELETEURL, PUTURL } from "Public/js/Api";
import Data from "../../../Data.json";
import { stringKeyValue } from "Src/utils";
import { connect } from "react-redux";
import { updateData } from "Store/Roster/action";
import { Input, Pagination, message } from "antd";

//用来保存当前选中行
let curRow = null;

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      attr: "",
      page: 1,
      pageSize: 10,
      total: 10,
      data: [],
      params: {}
    };
  }

  componentWillMount() {
    this._init();
    this._initTable(this.props.path);
  }

  componentWillReceiveProps(nextProps) {
    let params = {};
    if (this.props.visible === !nextProps.visible) return; //如果仅仅改变了modal框的显示与否 则不刷新数据
    if (this.props.path !== nextProps.path) {
      console.log("切换路径");
      this._initTable(nextProps.path);
    } else {
      if (nextProps.gradeValue) {
        if (nextProps.gradeValue !== this.props.gradeValue) {
          params.grade = nextProps.gradeValue;
        } else {
          params.grade = this.props.gradeValue;
        }
      }
      if (nextProps.branchValue) {
        if (nextProps.branchValue !== this.props.branchValue) {
          params.branch = nextProps.branchValue;
        } else {
          params.branch = this.props.branchValue;
        }
      }
      if (nextProps.readyValue) {
        if (nextProps.readyValue !== this.props.readyValue) {
          params.ready = nextProps.readyValue;
        } else {
          params.ready = this.props.readyValue;
        }
      }
      this._initTable(this.props.path, params);
    }
  }

  _init = () => {
    document.onkeydown = e => {
      let event = e || window.event;
      this.handleDelete(event);
    };
  };

  /**
   * 初始化数据
   */
  _initTable = (path, params = {}, page = 1) => {
    console.log(params);
    console.log(">>>>>>>>>>>");
    let columns = [];
    switch (path) {
      case "/roster/all":
        // data = Data.all.data;
        columns = Data.all.columns;
        break;
      case "/roster/activist":
        // data = Data.activist.data;
        columns = Data.activist.columns;
        break;
      case "/roster/candidate":
        // data = Data.candidate.data;
        columns = Data.candidate.columns;
        break;
      case "/roster/ready":
        // data = Data.ready.data;
        columns = Data.ready.columns;
        break;
      case "/roster/approved":
        // data = Data.approved.data;
        columns = Data.approved.columns;
        break;
      // case "/roster/graduated":
      //   // data = Data.graduated.data;
      //   columns = Data.graduated.columns;
      //   break;
      case "/table/table_1":
        // data = Data.table_1.data;
        columns = Data.table_1.columns;
        break;
      case "/table/table_2":
        // data = Data.table_2.data;
        columns = Data.table_2.columns;
        break;
      case "/table/table_3":
        // data = Data.table_3.data;
        columns = Data.table_3.columns;
        break;
      case "/table/table_4":
        // data = Data.table_4.data;
        columns = Data.table_4.columns;
        break;
      case "/table/publicity":
        // data = Data.publicity.data;
        columns = Data.publicity.columns;
        break;
    }
    this.setState({ columns });
    Get(
      path,
      params,
      res => {
        console.log("请求成功");
        if (res.code === 200) {
          let { data, total } = res.data;
          this.setState({
            page,
            total,
            data
          });
        } else {
          message.error(res.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  /**
   * 编辑指定内容
   */
  handleEdit = (id, e) => {
    let event = e || window.event;
    let target = event.target;
    let attr = target.getAttribute("attr");
    let editable = target.getAttribute("editable");
    if (editable === "true") {
      target.style.display = "none";
      let input = target.nextSibling;
      input.style.display = "block";
      input.value = target.innerHTML;
      input.focus();
      input.onblur = () => {
        let value = input.value;
        if (value !== target.innerHTML) {
          if (window.confirm("确认修改？")) {
            if (value === "" || value === "无") {
              value = null;
            }
            let params = { id, [attr]: value };
            Put(
              this.props.path + PUTURL,
              JSON.stringify(params),
              res => {
                if (res.code === 200) {
                  /* 请求发送成功后 */
                  if (!value) {
                    value = "无";
                  }
                  target.innerHTML = value;
                  message.success(res.msg);
                } else {
                  message.error(res.msg);
                }
                target.style.display = "inline-block";
                input.style.display = "none";
              },
              err => {
                console.log(err);
              }
            );
          }
        } else {
          target.style.display = "inline-block";
          input.style.display = "none";
          message.info("无任何修改");
        }
      };
    }
  };

  /**
   * 选中某一行
   */
  handleRow = (id, e) => {
    let event = e || window.event;
    let curTarget = event.currentTarget || event.srcElement;
    if (curRow) {
      curRow.style.backgroundColor = "";
    }
    curTarget.style.backgroundColor = "rgba(255, 66, 66, 0.1)";
    curRow = curTarget;
    this.setState({ id });
  };

  /**
   * 删除某项数据
   */
  handleDelete = event => {
    if (event.keyCode === 46) {
      console.log(event.keyCode);
      if (this.state.id) {
        if (window.confirm("确认删除该生所有信息？")) {
          let params = { id };
          /** 提交删除 */
          Delete(
            this.props.path + DELETEURL,
            params,
            res => {
              console.log("请求成功");
              console.log(res);

              /* 请求发送成功后 */
              if (res.code === 200) {
                this.setState({ id: 0 });
                message.success(res.msg);
                curRow.parentNode.removeChild(curRow);
                curRow = null;
              } else {
                message.error(res.msg);
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      }
    }
  };

  handlePage = page => {
    let params = {};
    if (this.props.gradeValue) {
      params.grade = this.props.gradeValue;
    }
    if (this.props.branchValue) {
      params.grade = this.props.branchValue;
    }
    /*发送请求并更新数据 */
    this._initTable(this.props.path, params, page);
  };

  getColSpan = dataIndex => {
    if (/term_\d/.test(dataIndex)) {
      return 3;
    } else if (
      /sponsor/.test(dataIndex) ||
      /merit/.test(dataIndex) ||
      /shortcoming/.test(dataIndex) ||
      /mark/.test(dataIndex) ||
      /assessment/.test(dataIndex) ||
      /scholarship/.test(dataIndex)
    ) {
      return 2;
    }
    return 1;
  };

  render() {
    return (
      <div className="table-list" onKeyDown={this.handleDelete}>
        <div className="table-content">
          <table border="1">
            <thead>
              <tr>
                {this.state.columns.map((item, index) => (
                  <th key={index} colSpan={this.getColSpan(item.dataIndex)}>
                    <span>{item.title}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.data ? (
                this.state.data
                  .slice(
                    (this.state.page - 1) * this.state.pageSize,
                    this.state.page * this.state.pageSize
                  )
                  .map((item, index) => (
                    <tr
                      key={index}
                      onClick={this.handleRow.bind(this, item.id)}
                      onDoubleClick={this.handleEdit.bind(this, item.id)}
                      // onContextmenu={this.handleDelete}
                    >
                      <td>
                        <span>{index + 1}</span>
                      </td>
                      {Object.keys(item).map((key, ind) => (
                        <td key={ind}>
                          <span
                            attr={key}
                            editable={key === "id" ? "false" : "true"}
                          >
                            {item[key] ? item[key] : "无"}
                          </span>
                          <Input
                            style={{ display: "none" }}
                            defaultValue={item[key]}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
              ) : (
                <tr>
                  <td>暂无数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <Pagination
            defaultCurrent={this.state.page}
            total={this.state.total}
            pageSize={this.state.pageSize}
            onChange={this.handlePage}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    branchValue: state.rosterData.branchValue,
    gradeValue: state.rosterData.gradeValue,
    readyValue: state.rosterData.readyValue,
    path: state.rosterData.path
  }),
  { updateData }
)(TableList);
