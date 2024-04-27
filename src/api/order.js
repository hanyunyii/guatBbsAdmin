import axios from "axios";

export function getOrderList(params) {
    return axios.post('/api/order/page', { ...params},{params:{... params}})
}

export function deleteOrder(id) {
    return axios.delete(`api/order/${id}`)

}

export function editOrder(body) {
    return axios.put('order', {...body})
}

export function addOrder(body) {
    return axios.post('order', {...body})
}

export function getOrderCompute() {
    return axios.get('order/compute')
}

export  function  exportOrderByDay(day){
    return axios.get('api/order/export/order'+day)
}

export  function editOrderDay(day){
    return axios.put('admin/update/'+day)
}

export  function getOrderDay(){
    return axios.get('admin/day')
}