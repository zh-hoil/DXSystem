export function getTargetAttr (dom, attr) {
    //获取事件目标对象的属性值
    //由于盒子嵌套, 因此需要遍历目标节点及其祖先节点, 直到找到节点属性为止, 否则返回" "
    return dom[attr]?dom[attr]:(dom.parentNode?getTargetAttr(dom.parentNode, attr):"")
}



//数组按照数组中对象某key值排序
export function sortBy(arr, key, boolean) {
    function compare(key) {
        return function (obj1, obj2) {
            if(obj1[key]<obj2[key]){
                return -1
            }else if(obj1[key]>obj2[key]){
                return 1
            }
            return 0
        }
    }
    if(boolean) {
        //从小到大
        return arr.sort(compare(key))
    }else{
        //从大到小
        return arr.sort(compare(key)).reverse()
    }
}


