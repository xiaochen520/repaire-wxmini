import {post} from './request'
import api from './index'

export function fetchNewsList(params) {
    return post(api.newList, params);
}