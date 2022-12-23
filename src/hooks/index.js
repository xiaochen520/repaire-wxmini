import { useLoad } from '@tarojs/taro';
import {ref} from 'vue';

export function usePageQuery() {
    let params = ref({});
    useLoad(option => {
        params.value = option;
    });

    return params;
}