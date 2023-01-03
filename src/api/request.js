import Taro from '@tarojs/taro';
import globalData from '../utils/globalData';

export function request(option = {}) {
    const token = globalData.token || Taro.getStorageSync('token') || '';

    return Taro.request({...option, header: {AuthCode: token}}).then(res => {
        return Promise.resolve(res.data);
    }).catch(err => {
        Taro.showToast({
            title: err,
            icon: 'none'
        })
        return Promise.reject(err);
    });
}

export function get(url, data = {}, option={}) {
    return request({url, data, ...option});
}


export function post(url, data = {}, option={}) {
    return request({url, data, method: 'POST', ...option});
}