import {get} from './request'
import { post } from './request'

const HttpManager = {

    getAllMine:()=>get('all'),

    getMineOfId:(id)=>get(`id/${id}`),

    getMineOfName:(name)=>get(`name/${name}`),

    getMineOfRegion:(region)=>get(`region/${region}`),

    getMineOfClassification:(classification)=>get(`class/${classification}`),

    getMineOfProduct:(product)=>get(`product/${product}`),

    getMineOfWord:(word)=>get(`word/${word}`),

    getProductByName:(name)=>get(`pro/name/${name}`),

    getList:(params)=>post(`table/mine-products`, params),

    setTableInfo:(params)=>post(`table/add`, params),

    getMineCount:()=>get(`table/count`),

    updateTableInfo:(params)=>post(`table/update`, params),

    getMineImgTime:(name)=>get(`table/time/${name}`),

}
export {HttpManager}