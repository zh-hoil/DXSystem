import axios from "axios";

const Ajax = axios.create({
    transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret.substring(0, ret.length-1)
    }],
});

// '/commentTopic'
// {
//     themeId: '2',
//     userId: '0001AA1000000002W4SU',
//     content: "asdfasdfsd",
//     star: "2",
//     modules: "eg"
// }

export const userId = "0001AA1000000002W4SU";

export function Post(url, data, resolve, reject) {
    Ajax.post(url, data)
    .then(function (response) {
        if(response.status === 200) {
            resolve && resolve(response.data)
        }else{
            reject && reject(response.statusText)
        }
    })
    .catch(function (error) {
        reject && reject(error)
    });
}

export function Get(url, data, resolve, reject) {
    Ajax.get(url, {
        params: data
    })
    .then(function (response) {
        if(response.status === 200) {
            resolve && resolve(response.data)
        }else{
            reject && reject(response.statusText)
        }
    })
    .catch(function (error) {
        reject && reject(error)
    });
}