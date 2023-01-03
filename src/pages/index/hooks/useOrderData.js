import { ref, computed } from "vue";
import { fetchNewsList } from '../../../api/news'
import Taro, { useDidShow } from "@tarojs/taro"
import {get} from '../../../api/request'
import api from '../../../api'
import { toast } from '../../../utils'
import {useUserInfo} from '../../../hooks/useUserInfo'
export function useOrderData(roleId) {
    const { role } = useUserInfo();
    const orderData = ref({});

    useDidShow(() => {
        if(role.value) {
            getOrder();
        }
    });

    function getOrder() {
        const par = {
            roleId: role.value.roleId
        }
        get(api.homeMaintenanceData, par).then(res => {
            if (res.success) {
                orderData.value = res.result;
            } else {
                toast(res.message);
            }
        })
    }

    return { orderData }
}