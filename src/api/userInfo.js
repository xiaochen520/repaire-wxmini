import {post} from './request'
import api from './index'

export function editUser(params) {
    return post(api.editUserInfo, params);
}