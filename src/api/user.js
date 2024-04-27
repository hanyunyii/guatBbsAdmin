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


export  function  getPush(){
    return axios.get('admin/push')
}

export  function  getSure(){
    return axios.get('admin/sure')
}

export function  updatePush( push){
    return axios.put('admin/push', {push})
}

export  function  updateSure(sure){
    return axios.put('admin/sure',{sure})
}

export function updateSpeed(speed){
    return axios.put(`/admin/speed/${speed}`)
}
export function updateColor(color){
    return axios.put(`/admin/color/${color}`)
}

export function updateUser(user){
    return axios.post('/api/member/update',{...user})
}