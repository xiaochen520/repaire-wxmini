import Taro from '@tarojs/taro';

export function request(option = {}) {
    return Taro.request(option).then(res => {

    }).catch(err => {

    });
}

export function get(url, data = {}) {
    return request({url, data});
}


export function post(url, data = {}) {
    return request({url, data, method: 'POST'});
}