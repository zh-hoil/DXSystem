import React from "react";
import "./index.less";
import { Get } from "Public/js/Ajax";
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
      pageSize: 10
    };
  }

  componentWillMount() {
    this._init();
    this._initTable(this.props.path);
  }

  componentWillReceiveProps(nextProps) {
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
    params = {
      ...params,
      page
    };
    let data = [], columns = [];
    switch (path) {
      case "/roster/all":
        data = Data.all.data;
        columns = Data.all.columns;
        break;
      case "/roster/activist":
        data = Data.activist.data;
        columns = Data.activist.columns;
        break;
      case "/roster/ready":
        data = Data.ready.data;
        columns = Data.ready.columns;
        break;
      case "/roster/approved":
        data = Data.approved.data;
        columns = Data.approved.columns;
        break;
    }
    this.setState({
      data,
      columns
    });
    // Get(
    //   path,
    //   params,
    //   res => {
    //       console.log("请求成功")
    //       console.log(res)
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    console.log(params);
    console.log(path);
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
              target.innerHTML = value;
            }
          }

          /* 请求发送成功后 */
          target.style.display = "inline-block";
          input.style.display = "none";
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
          /** 提交删除 */
          curRow.parentNode.removeChild(curRow);
          curRow = null;
          id = "";
          console.log(this.state.id);
          console.log("delete");
        }
      }
    }
  };

  handlePage = page => {
    this.setState({ page });
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
                  <th key={index}>
                    <span>{item.title}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item, index) => (
                <tr
                  key={index}
                  onClick={this.handleRow.bind(this, item.id)}
                  onDoubleClick={this.handleEdit.bind(this, item.id)}
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
                        {item[key]}
                      </span>
                      <Input
                        style={{ display: "none" }}
                        defaultValue={item[key]}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <Pagination
            defaultCurrent={this.state.page}
            total={500}
            pageSize={this.state.pageSize}
            onChange={this.handlePage}
          />
        </div>
      </div>
    );
  }
}

export default TableList;
