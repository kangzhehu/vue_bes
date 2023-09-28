import axios from 'axios';
import {BASE_URL} from './config'

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
/**
 * 封装get
 * @param {*} url 
 * @param {*} params 
 */
export function get(url, params){
    return new Promise((resolve, reject) => {
        axios.get(url, params)
        .then(response=>{
            resolve(response);
        })
        .catch(err =>{
            reject(err);
        })
    })
}

/**
 * 封装post请求
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
export function post(url, data={}){
    return new Promise((resolve, reject) =>{
        axios.post(url, data)
        .then(response =>{
            resolve(response.data);
        }, err =>{
            reject(err);
        })
    })
}