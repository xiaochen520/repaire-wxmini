import Taro from '@tarojs/taro';

export function request(option = {}) {
    return Taro.request(option).then(res => {
        return Promise.resolve(res.data);
    }).catch(err => {
        Taro.showToast({
            title: err.message,
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