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
    uploadFile: base + "/maintenanceapi/user/uploadFile",
    submitFeedback: base + "/maintenanceapi/maintenancefeedback/submit", //反馈
    msgList: base + "/maintenanceapi/maintenancemessage/list", //消息列表
    homeMaintenanceData: base + "/maintenanceapi/maintenanceorder/homeMaintenanceData", //首页工单数据
    selectOrderList: base + "/maintenanceapi/maintenanceorder/selectOrderList", //工单列表
    orderDetail: base + "/maintenanceapi/maintenanceorder/orderDetail", //工单详情
    submitApply: base + "/maintenanceapi/maintenanceorder/submitApply", //工单申请
    msgDetail: base + "/maintenanceapi/maintenancemessage/detail", //消息详情
    orderProgressList: base + "/maintenanceapi/maintenanceorder/orderProgressList", //进度查询
    myOrderCount: base + "/maintenanceapi/user/myOrderCount", //我的工单
    repairList: base + "/maintenanceapi/user/repairList", //维修员列表
    managerDispatchOrder: base + "/maintenanceapi/maintenanceorder/managerDispatchOrder", //经理派单
    repairReceiveOrder: base + "/maintenanceapi/maintenanceorder/repairReceiveOrder", //维修员拒绝
    repairCompleteOrder: base + "/maintenanceapi/maintenanceorder/repairCompleteOrder", //维修员完成
}