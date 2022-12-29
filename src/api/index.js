export const base = 'http://42.192.119.148'
export default {
    wxLogin: base + "/wxmini/api/wxLogin",
    userDetail: base + "/maintenanceapi/user/detail", //用户详情
    editUserInfo: base + "/maintenanceapi/user/editUserInfo", //编辑
    loginByPassword: base + "/maintenanceapi/user/loginByPassword", //密码登录
    editPassword: base + "/maintenanceapi/user/editPassword", //修改密码
    newList: base + "/maintenanceapi/maintenanceannouncement/list", //新闻列表
    newDetail: base + "/maintenanceapi/maintenanceannouncement/detail", //新闻详情
    itemList: base + "/maintenanceapi/maintenanceproject/list", //项目列表
    itemDetail: base + "/maintenanceapi/maintenanceproject/detail", //项目详情
}