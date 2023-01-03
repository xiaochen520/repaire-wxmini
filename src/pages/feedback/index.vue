<template>
  <view class="feedback">
    <textarea v-model="content" placeholder="请填写您的宝贵意见" :maxlength="200" class="textarea"></textarea>
    <view class="upload-title flex-b">
      <view class="w">上传照片</view>
      <view>最多上传9张照片</view>
    </view>
    <view class="img-list flex-w">
      <view @tap="selectImgs" class="img-item camera flex-m flex-c">
        <view class='at-icon at-icon-camera'></view>
      </view>
      <view class="img-item" v-for="(item, index) in imgList" :key="index">
        <view @tap="removeImg(index)" class="at-icon at-icon-close-circle"></view>
        <image @tap="prewImg(item)" class="il-img" :src="item"></image>
      </view>
    </view>

    <AtButton :loading="saveLoad" @click="confirm" class="confirm-btn" type='primary'>提交</AtButton>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Taro, {useLoad} from "@tarojs/taro"
import {toast} from '../../utils/index'
import { useUploadImg } from '../../hooks/useUploadImg'
import api from '../../api'
import {post} from '../../api/request'
import './index.scss'

const {chooseImgs, uploadImg} = useUploadImg();
const imgList = ref([]);
const saveLoad = ref(false);
const content = ref('');

const maxImgAmount = 9;


function selectImgs() {
  chooseImgs().then(res => {
    if(res.length + imgList.value > maxImgAmount) {
      toast(`最多只能上传${maxImgAmount}张图片`);
    } else {
      return uploadImg(res);
    }
  }).then(res => {
    const imgs = res.map(e => {
      const img = JSON.parse(e.data)?.url;
      return img;
    });

    imgList.value = [...imgList.value, ...imgs];
  });
}

function prewImg(url) {
  Taro.previewImage({
    urls: [url]
  })
}

function removeImg(index) {
  imgList.value.splice(index, 1);
}

function confirm() {
  if(saveLoad.value) return;
  saveLoad.value = true;

  const par = {
    content: content.value,
    img: imgList.value.join()
  }

  post(api.submitFeedback, par).then(res => {
    saveLoad.value = false;
    if(res.success) {
      toast('反馈成功');
      setTimeout(() => {
        Taro.navigateBack({delta: 1});
      }, 1500)
    } else {
      toast(res.message);
    }
  });
}
</script>
