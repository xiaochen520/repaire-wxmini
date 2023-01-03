import {post} from './request'
import api from './index'

export function managerDispatchOrder(params) {
    return post(api.managerDispatchOrder, params);
}