import { ref, computed } from "vue";
import { fetchNewsList } from '../../../api/news'
import Taro, { useDidShow } from "@tarojs/taro"
import { toast } from '../../../utils'
export function useNewsList() {
    const bannerList = ref([]);
    const newsList = ref([]);

    useDidShow(() => {
        getNewsList();
        getBanner();
    });

    function getNewsList() {
        const par = {
            pageNo: 0,
            pageSize: 10,
            type: 1
        }
        fetchNewsList(par).then(res => {
            if (res.success) {
                newsList.value = res.result;
            } else {
                toast(res.message);
            }
        })
    }

    function getBanner() {
        const par = {
            pageNo: 0,
            pageSize: 20,
            type: 2
        }
        fetchNewsList(par).then(res => {
            if (res.success) {
                bannerList.value = res.result;
            } else {
                toast(res.message);
            }
        })
    }

    return { bannerList, newsList }
}