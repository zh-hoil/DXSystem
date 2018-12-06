import React from "react";
import SearchBar from "Components/SearchBar";
import ThemeList from "./ThemeList";
import { Drawer, List } from 'antd-mobile';
import "./index.less";
import { Ajax } from "Public/js/Ajax";
class ThemeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    componentDidMount() {
        // axios.get('/getNCCloudThemeField', {
        //     params: {
        //         userId: "0001AA1000000002W4SU",
        //     }

        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // Ajax({
        //     url: "/commentTopic",
        //     // transformRequest: [function (data) {
        //     //     let ret = ''
        //     //     for (let it in data) {
        //     //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        //     //     }
        //     //     return ret
        //     // }],
        //     data: {
        //         themeId: '2',
        //         userId: '0001AA1000000002W4SU',
        //         content: "asdfasdfsd",
        //         star: "2",
        //         modules: "eg"
        //     },
        //     method: "post",

        // }).then(function (response) {
        //     console.log(response);
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     });;
        Ajax.post('/commentTopic', {
            themeId: '2',
            userId: '0001AA1000000002W4SU',
            content: "asdfasdfsd",
            star: "2",
            modules: "eg"
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    onOpenChange () {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                        multipleLine
                    >Category</List.Item>);
                }
                return (<List.Item key={index}
                    thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                >Category{index}</List.Item>);
            })}
        </List>);

        return (<div>
            <Drawer
                position="right"
                style={{ minHeight: document.documentElement.clientHeight }}
                sidebar={sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange.bind(this)}
            >
                <div>
                    <SearchBar triggleDrawer={this.onOpenChange.bind(this)} searchBoolean={false} />
                    <ThemeList />
                </div>
            </Drawer>
        </div>);
    }

}
export default ThemeSearch;
