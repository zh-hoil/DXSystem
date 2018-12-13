import axios from "axios";
import { getLocalStorage } from "./../../utils";
const baseURL = "http://10.11.115.74:5050/fiwechat";
const Ajax = axios.create({
    transformRequest: [
        function(data) {
            let ret = "";
            for (let it in data) {
                ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
            }
            return ret.substring(0, ret.length - 1);
        }
    ]
});

// '/commentTopic'
// {
//     themeId: '2',
//     userId: '0001AA1000000002W4SU',
//     content: "asdfasdfsd",
//     star: "2",
//     modules: "eg"
// }

export const userId = getLocalStorage("YY_userInfo")
    ? getLocalStorage("YY_userInfo")
    : "0001AA1000000002W4SU";
export function Post(url, data, resolve, reject) {
    url = baseURL + url;
    Ajax.post(url, data)
        .then(function(response) {
            if (response.status === 200) {
                resolve && resolve(response.data);
            } else {
                reject && reject(response.statusText);
            }
        })
        .catch(function(error) {
            reject && reject(error);
        });
}

export function Get(url, data, resolve, reject) {
    url = baseURL + url;
    Ajax.get(url, {
        params: data
    })
        .then(function(response) {
            if (response.status === 200) {
                resolve && resolve(response.data);
            } else {
                reject && reject(response.statusText);
            }
        })
        .catch(function(error) {
            reject && reject(error);
        });
}
