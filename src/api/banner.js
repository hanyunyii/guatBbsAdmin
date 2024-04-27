import axios from "axios";

export function  addBanner(url,type){
    return axios.post('/banner',{url:url,type:type})
}

export function  getBannerList(){
    return axios.get('banner')
}

export function  deleteBanner(id){
    return axios.delete(`/banner/${id}`)
}

