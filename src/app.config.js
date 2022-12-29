export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my/index',
    'pages/login/index',
    'pages/author/index',
    'pages/userInfo/index',
    'pages/feedback/index',
    'pages/about/index',
    'pages/message/index',
    'pages/order/index',
    'pages/orderDetail/index',
    'pages/items/index',
    'pages/itemDetail/index',
    'pages/news/index',
    'pages/newDetail/index',
    'pages/apply/index',
    'pages/progress/index',
    'pages/evaluate/index',
    'pages/editUser/index',
    'pages/editPsd/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#6190E8',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './imgs/tabs/home.png',
        selectedIconPath: './imgs/tabs/home-active.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './imgs/tabs/my.png',
        selectedIconPath: './imgs/tabs/my-active.png'
      }
    ]
  }
})
