import Taro, { useLoad, useDidShow } from '@tarojs/taro'
import globalData from '../utils/globalData';
import api from '../api'
export function useUploadImg() {

  function chooseImgs(options = {}) {
    return Taro.chooseImage(options).then(res => {
      if (res.errMsg === "chooseImage:ok") {
        return Promise.resolve(res.tempFilePaths);
      } else {
        return Promise.reject(res.errMsg);
      }
    }).catch(err => {
      return Promise.reject(err);
      toast('选择图片失败');
    });
  }

  // 上传图片
  function uploadImg(imgs) {
    const fetchArr = [];
    imgs.forEach(e => {
      fetchArr.push(Taro.uploadFile({
        url: api.uploadFile,
        filePath: e,
        name: 'file',
        header: {
          AuthCode: globalData.token || Taro.getStorageSync('token') || ''
        }
      }))
    });
    
    return Promise.all(fetchArr)
  }

  return { chooseImgs, uploadImg }
}