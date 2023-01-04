<template>
  <view class="apply">
    <view class="block">
      <view class="form-row flex-m">
        <view class="label require">所属项目：</view>
        <picker
          :range="itemList"
          class="input flex-1"
          header-text="选择项目"
          range-key="projectName"
          :value="projectPickerIndex"
          mode="selector"
          @change="changeProjectPicker"
        >
          <view class="flex-m">
            <view class="flex-1">{{
              (itemList[projectPickerIndex] &&
                itemList[projectPickerIndex].projectManagerName) ||
              "请选择项目"
            }}</view>
            <view class="at-icon at-icon-chevron-right"></view>
          </view>
        </picker>
      </view>
      <view class="form-row flex-m">
        <view class="label require">项目经理：</view>
        <view class="input flex-1">{{
          (itemList[projectPickerIndex] &&
            itemList[projectPickerIndex].projectName) ||
          ""
        }}</view>
      </view>
      <view class="form-row">
        <view class="label require">问题描述：</view>
        <textarea
          placeholder="请输入您要提交的内容"
          v-model="formData.problemDescribe"
          class="textarea flex-1"
          type="text"
        />
      </view>
    </view>

    <view class="block">
      <view class="upload-title flex-b">
        <view class="w">上传照片</view>
        <view>最多上传9张照片</view>
      </view>

      <view class="img-list flex-w">
        <view @tap="selectImgs" class="img-item camera flex-m flex-c">
          <view class="at-icon at-icon-camera"></view>
        </view>
        <view class="img-item" v-for="(item, index) in imgList" :key="index">
          <view
            @tap="removeImg(index)"
            class="at-icon at-icon-close-circle"
          ></view>
          <image @tap="prewImg(item)" class="il-img" :src="item"></image>
        </view>
      </view>
    </view>

    <view class="block">
      <view @tap="getLocation" class="form-row flex-m">
        <view class="label require">维保地址：</view>
        <view class="flex-1">{{
          formData.maintenanceAddress || "选择维保地址"
        }}</view>
        <view class="at-icon at-icon-map-pin"></view>
      </view>
      <view class="form-row flex-m">
        <view class="label require">门牌号：</view>
        <input
          v-model="formData.maintenanceHouseNumber"
          class="input flex-1"
          type="text"
        />
      </view>

      <picker
        :range="timeList"
        header-text="选择上门时间"
        :value="timePickerIndex"
        mode="selector"
        @change="changeTimePicker"
      >
        <view class="form-row flex-m">
          <view class="label require">上门时间：</view>
          <view class="flex-1">{{ timeList[timePickerIndex] }}</view>
          <view class="at-icon at-icon-chevron-right"></view>
        </view>
      </picker>
      <nut-datepicker
        v-model="applyTime"
        type="datetime"
        v-model:visible="showTimePicker"
        :min-date="minDate"
        :is-show-chinese="true"
      ></nut-datepicker>
      <view class="form-row flex-m">
        <view class="label require">联系人：</view>
        <input
          v-model="formData.contactPerson"
          class="input flex-1"
          type="text"
        />
      </view>
      <view class="form-row flex-m">
        <view class="label require">电话：</view>
        <input
          v-model="formData.contactNumber"
          class="input flex-1"
          type="text"
        />
      </view>
    </view>

    <view class="footer flex-m">
      <nut-button
        :loading="saveLoad"
        @click="confirm"
        class="button"
        type="info"
        >发布工单</nut-button
      >
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import Taro, { useLoad } from "@tarojs/taro";
import { useUploadImg } from "../../hooks/useUploadImg";
import "./index.scss";
import { toast } from "../../utils";
import { fetchItemsList } from "../../api/project";
import api from "../../api";
import { post, get } from "../../api/request";
import { useUserInfo } from "../../hooks/useUserInfo";
import globalData from '../../utils/globalData';

const { chooseImgs, uploadImg } = useUploadImg();
const imgList = ref([]);
const itemList = ref([]);
const saveLoad = ref(false);
const projectPickerIndex = ref(0);
const timeList = ref(["立即上门", "预约时间"]);
const timePickerIndex = ref(0);
const applyTime = ref(new Date());
const minDate = ref(new Date());
const showTimePicker = ref(false);

const formData = ref({
  contactNumber: "",
  contactPerson: "",
  maintenanceAddress: "",
  maintenanceHouseNumber: "",
  makeAppointmentTimeStr: "",
  problemDescribe: "",
  problemImage: "",
  projectId: "",
});
const maxImgAmount = 9;

useLoad(() => {
  // 获取项目列表
  getItemList();

  // 获取用户信息
  getUserDetail();
});

function getItemList() {
  fetchItemsList({ pageNo: 0, pageSize: 999 }).then((res) => {
    if (res.success) {
      itemList.value = res.result;
    } else {
      toast(res.message);
    }
  });
}

function selectImgs() {
  chooseImgs()
    .then((res) => {
      if (res.length + imgList.value.length > maxImgAmount) {
        toast(`最多只能上传${maxImgAmount}张图片`);
      } else {
        return uploadImg(res);
      }
    })
    .then((res) => {
      const imgs = res.map((e) => {
        const img = JSON.parse(e.data)?.url;
        return img;
      });

      imgList.value = [...imgList.value, ...imgs];
    });
}

function removeImg(index) {
  imgList.value.splice(index, 1);
}

function prewImg(url) {
  Taro.previewImage({
    urls: [url],
  });
}

function getLocation() {
  Taro.chooseLocation().then((res) => {
    if (res.errMsg === "chooseLocation:ok") {
      formData.value.maintenanceAddress = res.address;
    }
  });
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return (`${year}-${month}-${day} ${hour}:${minute}:${second}`)
}

function confirm() {
  if (saveLoad.value) return;
  saveLoad.value = true;

  formData.value.projectId = itemList.value[projectPickerIndex.value].projectId;
  formData.value.problemImage = imgList.value.join();

  if(timeList.value[timePickerIndex.value] === '预约时间') {
    formData.value.makeAppointmentTimeStr = formatDate(applyTime.value);
  } else {
    formData.value.makeAppointmentTimeStr = "立即上门";
  }

  console.log(111, formData.value);
  

  post(api.submitApply, formData.value).then((res) => {
    saveLoad.value = false;
    if (res.success) {
      toast("发布成功");
      setTimeout(() => {
        Taro.navigateBack({
          delta: 1,
        });
      }, 1500);
    } else {
      toast(res.message);
    }
  });
}

function changeProjectPicker(e) {
  projectPickerIndex.value = e.detail.value;
}

function changeTimePicker(e) {
  timePickerIndex.value = e.detail.value;
  if (timeList.value[e.detail.value] === "预约时间") {
    showTimePicker.value = true;
  }
}

function getUserDetail() {
  get(api.userDetail).then((res) => {
    if (res.success) {
      formData.value.contactPerson = res.result.nickName;
      formData.value.contactNumber = res.result.phone;
    } else {
      toast(res.message);
    }
  });
}

</script>
