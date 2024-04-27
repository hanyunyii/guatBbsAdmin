import axios from "axios";

export function  getAreas(){

    return axios.get('/hotel/')
}

export function  addHotel(hotel){
    return axios.post('/hotel',{... hotel})
}

export  function  getHotelList(params){
    return axios.get('/hotel/list',{params:{ ... params}})
}

export function  deleteHotel(id){
    return axios.delete(`/hotel/${id}`)
}

export  function  addHotelDetails(hotelDetails){
    return axios.post('/hotel/details',{... hotelDetails})
}

export function getHotelDetails(id){
    return axios.get(`/hotel/details/${id}`)
}

export  function  deleteHotelDetails(id){
    return axios.delete(`/hotel/details/${id}`)
}

export  function  editHotelDetails(hotel){
    return axios.put(`/hotel/details/`,{... hotel})
}

export function getMakeHotelPage(params){
    return axios.get('/hotel/make/list',{params:{... params}})
}

export function editHotel(hotel){
    return axios.put('/hotel',{... hotel})
}

export function  batchSaveHotel(hotel){
    return axios.post('/hotel/batch',{... hotel})
}