export function getTargetAttr (dom, attr) {
    //获取事件目标对象的属性值
    //由于盒子嵌套, 因此需要遍历目标节点及其祖先节点, 直到找到节点属性为止, 否则返回" "
    return dom[attr]?dom[attr]:(dom.parentNode?getTargetAttr(dom.parentNode, attr):"")
}

export function sortBy(arr, key) {
    //将数组按key排序
    return arr
}