import Taro, { useTabItemTap, useLoad } from '@tarojs/taro'

export function isBoolean(bool) {
    return (typeof bool === 'boolean');
}

export function goRouter(options) {
    console.log(options)
    Taro.navigateTo(options)
}