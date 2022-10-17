import myAxios from "../my-axios";
import type { AxiosRequestConfig } from 'axios'

const axios = myAxios();


/*-----------------------------------------User-------------------------------------------------------*/
export const queryUserByUserNameApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
export const insertUserApi = (url: string, config: AxiosRequestConfig) => {
    return axios.post(url, config)
}
/*-----------------------------------------User-------------------------------------------------------*/

/*-----------------------------------------Order-------------------------------------------------------*/
export const queryAllOrderByUserNameApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}

/*-----------------------------------------Order-------------------------------------------------------*/

/*-----------------------------------------Type-------------------------------------------------------*/
export const queryAllTypeApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
/*-----------------------------------------Type-------------------------------------------------------*/

/*-----------------------------------------Rotation-------------------------------------------------------*/
export const queryAllRotationApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
/*-----------------------------------------Rotation-------------------------------------------------------*/

/*-----------------------------------------product-------------------------------------------------------*/
export const queryProductByTypeApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
export const queryProductByEmergeApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
export const queryProductByIdApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
export const queryCommentsByProductIdApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
export const queryProductByProductMsgApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
/*-----------------------------------------product-------------------------------------------------------*/


/*-----------------------------------------emerge-------------------------------------------------------*/
export const queryAllEmergeApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
/*-----------------------------------------emerge-------------------------------------------------------*/


/*-----------------------------------------shop-------------------------------------------------------*/
export const queryShopByUserNameApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
export const updateShopByIdApi = (url: string, config: AxiosRequestConfig) => {
    return axios.post(url, config)
}
export const deleteShopbyIdApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
export const insertShopApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)
}
/*-----------------------------------------shop-------------------------------------------------------*/





