import Taro, { useLoad } from '@tarojs/taro';
import { ref } from 'vue';
import { isBoolean } from '../utils'
import globalData from '../utils/globalData';

export function useLoginState() {
    const isLogin = ref(false);
    useLoad(() => {
        if (isBoolean(globalData.isLogin)) {
            isLogin.value = globalData.isLogin;
        } else {
            isLogin.value = Taro.getStorageSync('islogin') || false;
            globalData.isLogin = isLogin.value;
        }

    })

    return { isLogin }
}