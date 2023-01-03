import {post} from './request'
import api from './index'

export function fetchItemsList(params) {
    return post(api.itemList, params);
}