import axios from "axios";

export function  addBanner(url){
    return axios.post('/banner',{url})
}

export function  getBannerList(){
    return axios.get('banner')
}

export function  deleteBanner(id){
    return axios.delete(`/banner/${id}`)
}