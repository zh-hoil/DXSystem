import axios from "axios";
import { getLocalStorage } from "Src/utils";

export const userId = getLocalStorage("YY_userInfo")
    ? getLocalStorage("YY_userInfo")
    : "0001AA1000000009SORC";

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

export function Post(url, data, resolve, reject) {
    url = window.RootURL + url;
    // if (!data.userId) {
    //     data.userId = userId;
    // }
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
    url = window.RootURL + url;
    // if (!data.userId) {
    //     data.userId = userId;
    // }
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

export function Put(url, data, resolve, reject) {
    url = window.RootURL + url;
    // if (!data.userId) {
    //     data.userId = userId;
    // }
    Ajax.put(url, {
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

export function Delete(url, data, resolve, reject) {
    url = window.RootURL + url;
    // if (!data.userId) {
    //     data.userId = userId;
    // }
    Ajax.delete(url, {
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
