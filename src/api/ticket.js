import axios, {post} from "axios";

export function getTicketList(params, level) {
    return axios.post(`/api/ticket/page/7777`, {ssName:params.key,page: params.page, rows: params.rows}, {params: {level: 7,key:params.key}})
}

export function updateOrSave(body) {
    return axios.post('/api/ticket/saveOrUpdate', {... body})
}

export function  batchEditBeforeDay(day){
    return axios.put(`/api/ticket/batch/${day}`)
}
