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
export const deleteShopbyId = (url: string, config: AxiosRequestConfig) => {
    return axios.post(url, config)

}







