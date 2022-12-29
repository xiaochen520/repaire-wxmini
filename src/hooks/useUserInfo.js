import Taro, { useLoad, useDidShow } from '@tarojs/taro'
import { ref } from 'vue';
import { isBoolean } from '../utils'
import globalData from '../utils/globalData'
import {post} from '../api/request'
import api from '../api'

export function useLoginState() {
    const isLogin = ref(false);
    useLoad(() => {
        if (globalData.token) {
            isLogin.value = true;
        } else {
            isLogin.value = Taro.getStorageSync('token') ? true : false;
        }
    })

    return { isLogin }
}

export function useUserInfo() {
    const isLogin = ref(false);
    const role = ref(-1);

    useDidShow(() => {
        isLogin.value = Boolean(globalData.token || Taro.getStorageSync('token'));
        role.value = globalData.role || Taro.getStorageSync('role');
    });
    
    return {isLogin, role};
}