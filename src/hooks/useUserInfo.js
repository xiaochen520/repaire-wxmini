import Taro, { useLoad, useDidShow } from '@tarojs/taro'
import { ref } from 'vue';
import { isBoolean } from '../utils'
import globalData from '../utils/globalData'
import {post} from '../api/request'
import api from '../api'

export function useUserInfo() {
    const isLogin = ref(false);
    const role = ref(null);
    const project = ref(-1);
    
    useDidShow(() => {
        if(globalData.token) {
            isLogin.value = Boolean(globalData.token);
            role.value = globalData.role;
            project.value = globalData.projectList[0] || null;
        } else {
            isLogin.value = Boolean(Taro.getStorageSync('token'));
            role.value = JSON.parse(Taro.getStorageSync('role') || 'null');
            project.value = JSON.parse(Taro.getStorageSync('projectList') || '[]')[0] || null;
        }
        
    });
    
    return {isLogin, role, project};
}