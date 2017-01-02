let app = getApp()
let {formatTime} = require('../../utils/util')
Page({
  data: {
    orders: [{
      avatarUrl: "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKIGZFsxrdaqXrQQQiaDx3GVeGXxN4dN9DiacGJVdfEibzDdBiav5yzGIzbBpiaibN4RKTambsjWy8UZXYw/0",
      gender: 1,
      nickname: '刘某',
      endPoint: {
        label: '江虹国际创意园',
        lnglat: []
      },
      startPoint: {
        label: '玲珑府',
        lnglat: []
      },
      id: 1,
      phone: 13567899876,
      createTime: formatTime(new Date()),
      persons: 2
    }, {
      avatarUrl: "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKIGZFsxrdaqXrQQQiaDx3GVeGXxN4dN9DiacGJVdfEibzDdBiav5yzGIzbBpiaibN4RKTambsjWy8UZXYw/0",
      gender: 1,
      nickname: '刘某',
      endPoint: {
        label: '江虹国际创意园',
        lnglat: []
      },
      startPoint: {
        label: '玲珑府',
        lnglat: []
      },
      id: 1,
      createTime: formatTime(new Date()),
      phone: 13567899876,
      persons: 2
    }]
  },
  onLoad () {
    this.getUserInfo()
    this.socket()
  },
  socket () {
    wx.connectSocket({
      url: 'wss://localhost:3000/ws/orders'
    })
    wx.onSocketOpen((res) => {
      console.log(res);
    })
  },
  getUserInfo () {
    app.getUserInfo((info) => {
      console.log(info);
    })
  }
})
