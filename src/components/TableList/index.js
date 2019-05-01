import React from "react";
import "./index.less";
import { Get, Put, Deletes } from "Public/js/Ajax";
import { DELETEURL, PUTURL } from "Public/js/Api";
import Data from "../../../Data.json";
import { Input, Pagination } from "antd";

//用来保存当前选中行
let curRow = null;

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      page: 1,
      pageSize: 2,
      total: 200,
      data: []
    };
  }

  componentWillMount() {
    this._init();
    this._initTable(this.props.path);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible === !nextProps.visible) return; //如果仅仅改变了modal框的显示与否 则不刷新数据
    let { path, params } = nextProps;
    if (this.props.path !== path) {
      params = {};
    }
    this._initTable(path, params);
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
      case "/roster/ready":
        // data = Data.ready.data;
        columns = Data.ready.columns;
        break;
      case "/roster/approved":
        // data = Data.approved.data;
        columns = Data.approved.columns;
        break;
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
      case "/table/candidate":
        // data = Data.candidate.data;
        columns = Data.candidate.columns;
        break;
      case "/table/publicity":
        // data = Data.publicity.data;
        columns = Data.publicity.columns;
        break;
      case "/table/graduated":
        // data = Data.graduated.data;
        columns = Data.graduated.columns;
        break;
    }
    this.setState({ columns });
    Get(
      path,
      params,
      res => {
        console.log("请求成功");
        let { data, total } = res.data;
        this.setState({
          page,
          total,
          data
        });
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
      input.addEventListener(
        "blur",
        attr => {
          let value = input.value;
          if (value !== target.innerHTML) {
            if (window.confirm("确认修改？")) {
              let params = { id, attr };
              // Put(
              //   path + PUTURL,
              //   params,
              //   res => {
              //       console.log("请求成功")
              //       console.log(res)
              /* 请求发送成功后 */
              // target.innerHTML = value;
              // target.style.display = "inline-block";
              // input.style.display = "none";
              //   },
              //   err => {
              //     console.log(err);
              //   }
              // );
            }
          }
        },
        false
      );
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
          let params = { id: this.state.id };
          /** 提交删除 */
          // Delete(
          //   path + DELETEURL,
          //   params,
          //   res => {
          //       console.log("请求成功")
          //       console.log(res)
          //       curRow.parentNode.removeChild(curRow);
          //       curRow = null;
          // /* 请求发送成功后 */
          //   },
          //   err => {
          //     console.log(err);
          //   }
          // );
          this.setState({ id: "" });
          console.log("delete");
        }
      }
    }
  };

  handlePage = page => {
    let { path, params } = this.props;
    /*发送请求并更新数据 */
    this._initTable(path, params, page);
  };

  render() {
    return (
      <div className="table-list" onKeyDown={this.handleDelete}>
        <div className="table-content">
          <table border="1">
            <thead>
              <tr>
                {this.state.columns.map((item, index) => (
                  <th key={index} colSpan={/term_\d/.test(item.dataIndex)?3:1}>
                    <span>{item.title}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.data
                ? this.state.data.map((item, index) => (
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
                            {item[key]?item[key]:"无"}
                          </span>
                          <Input
                            style={{ display: "none" }}
                            defaultValue={item[key]}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                : <tr><td>暂无数据</td></tr>}
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

export default TableList;
