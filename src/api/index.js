const base = 'http://42.192.119.148'
export default {
    wxLogin: base + "/wxmini/api/wxLogin",
    userDetail: base + "/maintenanceapi/user/detail", //用户详情
    editUserInfo: base + "/maintenanceapi/user/editUserInfo", //编辑
    loginByPassword: base + "/maintenanceapi/user/loginByPassword"
}