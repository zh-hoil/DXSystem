import React from "react";
import "./index.less";
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";
import { Modal, Button } from 'antd';

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`
//   });
// }
const columns = [
  {
    title: "序号",
    dataIndex: "index"
  },
  {
    title: "学号",
    dataIndex: "id"
  },
  {
    title: "班级",
    dataIndex: "class",
    editable: true
  },
  {
    title: "名字",
    dataIndex: "name",
    editable: true
  },
  {
    title: "出生年月日",
    dataIndex: "both",
    editable: true
  },
  {
    title: "入党申请时间",
    dataIndex: "apply",
    editable: true
  },
  {
    title: "积极分子时间",
    dataIndex: "active",
    editable: true
  },
  {
    title: "入党时间",
    dataIndex: "ready",
    editable: true
  },
  {
    title: "转正时间",
    dataIndex: "approved",
    editable: true
  },
  {
    title: "奖学金一",
    dataIndex: "scholarship_1",
    editable: true
  },
  {
    title: "奖学金二",
    dataIndex: "scholarship_2",
    editable: true
  },
  {
    title: "奖学金三",
    dataIndex: "scholarship_3",
    editable: true
  },
  {
    title: "奖学金四",
    dataIndex: "scholarship_4",
    editable: true
  },
  {
    title: "奖学金五",
    dataIndex: "scholarship_5",
    editable: true
  },
  {
    title: "奖学金六",
    dataIndex: "scholarship_6",
    editable: true
  },
  {
    title: "奖学金七",
    dataIndex: "scholarship_7",
    editable: true
  },
  {
    title: "奖学金八",
    dataIndex: "scholarship_8",
    editable: true
  }
];

const data = [
  {
    id: "2153301",
    class: "21533",
    name: "kanglei",
    both: "19960701",
    apply: "20081023",
    active: "20091023",
    ready: "20101023",
    approved: "20111023",
    scholarship_1: "三等",
    scholarship_2: "三等",
    scholarship_3: "三等",
    scholarship_4: "三等",
    scholarship_5: "三等",
    scholarship_6: "三等",
    scholarship_7: "三等",
    scholarship_8: "三等",
  },
  {
    id: "2153302",
    class: "21533",
    name: "赵浚仪",
    both: "19960701",
    apply: "20081023",
    active: "20091023",
    ready: "20101023",
    approved: "20111023",
    scholarship_1: "三等",
    scholarship_2: "三等",
    scholarship_3: "三等",
    scholarship_4: "三等",
    scholarship_5: "三等",
    scholarship_6: "三等",
    scholarship_7: "三等",
    scholarship_8: "三等",
  },
  {
    id: "2153303",
    class: "21533",
    name: "王永毅",
    both: "19960701",
    apply: "20081023",
    active: "20091023",
    ready: "20101023",
    approved: "20111023",
    scholarship_1: "三等",
    scholarship_2: "三等",
    scholarship_3: "三等",
    scholarship_4: "三等",
    scholarship_5: "三等",
    scholarship_6: "三等",
    scholarship_7: "三等",
    scholarship_8: "三等",
  }
];

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleEdit = (e) => {
    let event = e || window.event;
    let target = event.target;
    let attr = target.getAttribute("attr");
    let editable = target.getAttribute("editable");
    if(editable === "true"){
      target.style.display = "none";
      let input = target.nextSibling
      input.style.display = "block";
      input.value = target.innerHTML;
      console.log("1")
      input.focus();
      input.addEventListener("blur", attr => {
        if(window.confirm("确认修改？")){
          let value = input.value;
          target.innerHTML = value;
        }

        /* 请求发送成功后 */
        input.style.display = "none";
        target.style.display = "inline";
      }, false)
    }
  }

  inputBlur = (attr) => {
    console.log(attr)
  }

  render() {
    return (
      <div className="table-list">
      {/* <Modal
          visible={this.state.visible}
          onOk={}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal> */}
        <table border="1">
          <thead>
            <tr>
              {columns.map((item, index) => (
                <th key={item.dataIndex}>{item.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                onDoubleClick={this.handleEdit}
              >
                <td>{index+1}</td>
                <td attr="id" editable="true">{item.id}</td>
                <Input  defaultValue={item.id} style={{ display: "none" }} />
                <td attr="class" editable="true">{item.class}</td>
                <Input  defaultValue={item.class} style={{ display: "none" }} />
                <td attr="name" editable="true">{item.name}</td>
                <Input  defaultValue={item.name} style={{ display: "none" }} />
                <td attr="both" editable="true">{item.both}</td>
                <Input  defaultValue={item.both} style={{ display: "none" }} />
                <td attr="apply" editable="true">{item.apply}</td>
                <Input  defaultValue={item.apply} style={{ display: "none" }} />
                <td attr="active" editable="true">{item.active}</td>
                <Input  defaultValue={item.active} style={{ display: "none" }} />
                <td attr="ready" editable="true">{item.ready}</td>
                <Input  defaultValue={item.ready} style={{ display: "none" }} />
                <td attr="approved" editable="true">{item.approved}</td>
                <Input  defaultValue={item.approved} style={{ display: "none" }} />
                <td attr="scholarship_1" editable="true">{item.scholarship_1}</td>
                <Input  defaultValue={item.id} style={{ display: "none" }} />
                <td attr="scholarship_2" editable="true">{item.scholarship_2}</td>
                <Input  defaultValue={item.scholarship_2} style={{ display: "none" }} />
                <td attr="scholarship_3" editable="true">{item.scholarship_3}</td>
                <Input  defaultValue={item.scholarship_3} style={{ display: "none" }} />
                <td attr="scholarship_4" editable="true">{item.scholarship_4}</td>
                <Input  defaultValue={item.scholarship_4} style={{ display: "none" }} />
                <td attr="scholarship_5" editable="true">{item.scholarship_5}</td>
                <Input  defaultValue={item.scholarship_5} style={{ display: "none" }} />
                <td attr="scholarship_6" editable="true">{item.scholarship_6}</td>
                <Input  defaultValue={item.scholarship_6} style={{ display: "none" }} />
                <td attr="scholarship_7" editable="true">{item.scholarship_7}</td>
                <Input  defaultValue={item.scholarship_7} style={{ display: "none" }} />
                <td attr="scholarship_8" editable="true">{item.scholarship_8}</td>
                <Input  defaultValue={item.scholarship_8} style={{ display: "none" }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
// const FormItem = Form.Item;
// const EditableContext = React.createContext();

// class EditableCell extends React.Component {
//   getInput = () => {
//     if (this.props.inputType === "number") {
//       return <InputNumber />;
//     }
//     return <Input />;
//   };

//   render() {
//     const {
//       editing,
//       dataIndex,
//       title,
//       inputType,
//       record,
//       index,
//       ...restProps
//     } = this.props;
//     return (
//       <EditableContext.Consumer>
//         {form => {
//           const { getFieldDecorator } = form;
//           return (
//             <td {...restProps}>
//               {editing ? (
//                 <FormItem style={{ margin: 0 }}>
//                   {getFieldDecorator(dataIndex, {
//                     rules: [
//                       {
//                         required: true,
//                         message: `Please Input ${title}!`
//                       }
//                     ],
//                     initialValue: record[dataIndex]
//                   })(this.getInput())}
//                 </FormItem>
//               ) : (
//                 restProps.children
//               )}
//             </td>
//           );
//         }}
//       </EditableContext.Consumer>
//     );
//   }
// }

// class TableList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { data, editingKey: "" };
//     this.columns = [
//       {
//         title: "序号",
//         dataIndex: "index"
//       },
//       {
//         title: "学号",
//         dataIndex: "id"
//       },
//       {
//         title: "班级",
//         dataIndex: "class",
//         editable: true
//       },
//       {
//         title: "名字",
//         dataIndex: "name",
//         editable: true
//       },
//       {
//         title: "出生年月日",
//         dataIndex: "both",
//         editable: true
//       },
//       {
//         title: "入党申请时间",
//         dataIndex: "apply",
//         editable: true
//       },
//       {
//         title: "积极分子时间",
//         dataIndex: "active",
//         editable: true
//       },
//       {
//         title: "入党时间",
//         dataIndex: "ready",
//         editable: true
//       },
//       {
//         title: "转正时间",
//         dataIndex: "approved",
//         editable: true
//       },
//       {
//         title: "奖学金一",
//         dataIndex: "scholarship_1",
//         editable: true
//       },
//       {
//         title: "奖学金二",
//         dataIndex: "scholarship_2",
//         editable: true
//       },
//       {
//         title: "奖学金三",
//         dataIndex: "scholarship_3",
//         editable: true
//       },
//       {
//         title: "奖学金四",
//         dataIndex: "scholarship_4",
//         editable: true
//       },
//       {
//         title: "奖学金五",
//         dataIndex: "scholarship_5",
//         editable: true
//       },
//       {
//         title: "奖学金六",
//         dataIndex: "scholarship_6",
//         editable: true
//       },
//       {
//         title: "奖学金七",
//         dataIndex: "scholarship_7",
//         editable: true
//       },
//       {
//         title: "奖学金八",
//         dataIndex: "scholarship_8",
//         editable: true
//       },
//       {
//         title: "operation",
//         dataIndex: "operation",
//         render: (text, record) => {
//           const { editingKey } = this.state;
//           const editable = this.isEditing(record);
//           return (
//             <div>
//               {editable ? (
//                 <span>
//                   <EditableContext.Consumer>
//                     {form => (
//                       <a
//                         href="javascript:;"
//                         onClick={() => this.save(form, record.key)}
//                       >
//                         Save
//                       </a>
//                     )}
//                   </EditableContext.Consumer>
//                   <Popconfirm
//                     title="Sure to cancel?"
//                     onConfirm={() => this.cancel(record.key)}
//                   >
//                     <a>Cancel</a>
//                   </Popconfirm>
//                 </span>
//               ) : (
//                 <a
//                   disabled={editingKey !== ""}
//                   onClick={() => this.edit(record.key)}
//                 >
//                   Edit
//                 </a>
//               )}
//             </div>
//           );
//         }
//       }
//     ];
//   }

//   isEditing = record => record.key === this.state.editingKey;

//   cancel = () => {
//     this.setState({ editingKey: "" });
//   };

//   save(form, key) {
//     form.validateFields((error, row) => {
//       if (error) {
//         return;
//       }
//       const newData = [...this.state.data];
//       const index = newData.findIndex(item => key === item.key);
//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, {
//           ...item,
//           ...row
//         });
//         this.setState({ data: newData, editingKey: "" });
//       } else {
//         newData.push(row);
//         this.setState({ data: newData, editingKey: "" });
//       }
//     });
//   }

//   edit(key) {
//     this.setState({ editingKey: key });
//   }

//   render() {
//     const components = {
//       body: {
//         cell: EditableCell
//       }
//     };

//     const columns = this.columns.map(col => {
//       if (!col.editable) {
//         return col;
//       }
//       return {
//         ...col,
//         onCell: record => ({
//           record,
//           inputType: "text",
//           dataIndex: col.dataIndex,
//           title: col.title,
//           editing: this.isEditing(record)
//         })
//       };
//     });

//     return (
//       <div className="table-list">
//         <EditableContext.Provider value={this.props.form}>
//           <Table
//             components={components}
//             bordered
//             dataSource={this.state.data}
//             columns={columns}
//             rowClassName="editable-row"
//             pagination={{
//               onChange: this.cancel
//             }}
//             scroll={{y: "100%", x: "100%"}}
//           />
//         </EditableContext.Provider>
//       </div>
//     );
//   }
// }

// TableList = Form.create()(TableList);
export default TableList;
