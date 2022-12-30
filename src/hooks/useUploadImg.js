export function useUploadImg() {

    function chooseImgs() {
        Taro.chooseImage().then(res => {
          console.log(111, res);
          if(res.errMsg === "chooseImage:ok") {
            if(imgList.length + res.tempFilePaths.length > maxImgAmount) {
              toast(`只能上传${maxImgAmount}张图片`);
            } else {
              uploadImg(res.tempFilePaths);
            }
          } else {
            toast(res.errMsg);
          }
        }).catch(err => {
          toast('选择图片失败');
        });
      }
}