import axios from "axios";

export function login(user) {
    return axios.post('/admin/login', {...user})
}


export function isLogin() {
    return axios.get('admin/isLogin', {headers: {'satoken': localStorage.getItem('token')}})
}

export function getUserList(params) {
    return axios.post('api/member/page', {...params}, {params: {...params}})
}

export function deleteUser(ids) {
    return axios.post('api/member/delete',  {},{params: {ids: ids}})
}