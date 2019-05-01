//获取事件目标对象的属性值
//由于盒子嵌套, 因此需要遍历目标节点及其祖先节点, 直到找到节点属性为止, 否则返回" "
export function getTargetAttr(dom, attr) {
  if (dom === document) {
    return;
  }
  return dom.getAttribute(attr)
    ? dom.getAttribute(attr)
    : dom.parentNode
    ? getTargetAttr(dom.parentNode, attr)
    : "";
}

//数组按照数组中对象某key值排序
export function sortBy(arr, key, boolean) {
  function compare(key) {
    return function(obj1, obj2) {
      if (obj1[key] < obj2[key]) {
        return -1;
      } else if (obj1[key] > obj2[key]) {
        return 1;
      }
      return 0;
    };
  }
  if (boolean) {
    //从小到大
    return arr.sort(compare(key));
  } else {
    //从大到小
    return arr.sort(compare(key)).reverse();
  }
}

//保存数据到本地存储中
export function addLocalStorage(key, value) {
  let arr = getLocalStorage(key);
  if (!arr) {
    arr = [];
  } else {
    //查看本地已有数据中是否已含有value
    for (let oldVal of arr) {
      if (oldVal == value) {
        return;
      }
    }
  }
  arr.push(value);
  localStorage.setItem(key, JSON.stringify(arr));
}

//获取本地存储中的数据
export function getLocalStorage(key) {
  let value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
}

// 将时间戳转为日期格式
export function formatDate(timestamp) {
  //timestamp必须是整数
  var time = new Date(timestamp);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
}

/**
 * 获取url参数
 * @param {String} query 当前 url 中传递的参数
 */
export const GetQuery = query => {
  let theRequest = {};
  if (query.indexOf("?") != -1) {
    let str = query.split("?")[1];
    if (str.indexOf("&") != -1) {
      if (str[0] == "&") {
        str = str.substr(1);
      }
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = decodeURIComponent(
          decodeURIComponent(strs[i].split("=")[1])
        );
      }
    } else {
      theRequest[str.split("=")[0]] = decodeURIComponent(
        decodeURIComponent(str.split("=")[1])
      );
    }
  }
  return theRequest;
};

//判断某数组里是否有某元素
export function hasItemInArr(arr, item) {
  if (arr.indexOf(item) > -1) {
    return true;
  }
  return false;
}

export function stringKeyValue(obj) {
  let str = "";
  for (let key in obj) {
    str += `&${key}="${obj[key]}"`;
  }
  return str.substr(1);
}
