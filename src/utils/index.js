import Taro, { useTabItemTap, useLoad } from '@tarojs/taro'

export function isBoolean(bool) {
    return (typeof bool === 'boolean');
}

export function goRouter(options) {
    console.log(options)
    Taro.navigateTo(options)
}

export function goTab(options) {
    Taro.switchTab(options)
}

export function loading() {
    Taro.showLoading({
        mask: true
    });
}

export function toast(text) {
    Taro.showToast({
        title: text,
        icon: 'none'
    });
}