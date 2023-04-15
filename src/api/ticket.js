import axios, {post} from "axios";

export function getTicketList(params, level) {
    return axios.post(`/api/ticket/page/7`, {ssName:params.key,page: params.page, rows: params.rows}, {params: {level: 7,key:params.key}})
}

export function updateOrSave(body) {
    return axios.post('/api/ticket/saveOrUpdate', {... body})
}
