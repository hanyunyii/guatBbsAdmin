import axios from "axios";

export function login(user) {
    return axios.post('/admin/login', {...user})
}


export function isLogin() {
    return axios.get('admin/isLogin', {headers: {'satoken': localStorage.getItem('token')}})
}

export function getLocalList(params) {
    return axios.get('api/member/local', {params: {...params}})
}

export function deleteLocal(ids) {
    return axios.delete(`api/member/local/${ids}`,)
}

export function editLocal(body) {
    return axios.put('/api/member/local', {...body})
}
export  function  addLocal(body){
    return axios.post('/api/member/local',{... body})
}