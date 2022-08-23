import myAxios from "../my-axios";
import type { AxiosRequestConfig } from 'axios'

const axios = myAxios();


export const queryProductByEmergeApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)

}
export const queryShopByUserNameApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)

}
export const updateShopByIdApi = (url: string, config: AxiosRequestConfig) => {
    return axios.post(url, config)

}
export const deleteShopbyIdApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)

}
export const queryUserByUserNameApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)

}
export const insertUserApi = (url: string, config: AxiosRequestConfig) => {
    return axios.post(url, config)


}
export const queryAllOrderByUserNameApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)


}
export const queryProductByIdApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)


}
export const queryCommentsByProductIdApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)


}
export const insertShopApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)


}
export const queryProductByProductMsgApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)


}
export const queryAllTypeApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)


}
export const queryAllRotationApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)


}
export const queryAllEmergeApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)


}
export const queryProductByTypeApi = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config)


}







