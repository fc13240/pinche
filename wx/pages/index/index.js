const app = getApp()
const MAP_CENTER_ICON = '/images/map-center-point.png'
const control = {
  id: 0,
  clickable: true,
  iconPath: MAP_CENTER_ICON,
  position: {
    top: 46,
    width: 36,
    height: 54,
    left: 0
  }
}
const {Map} = require('../../common/common')
Page({
  data: {
    startMapShow: false,
    endMapShow: false,
    form: {
      startPoint: {
        loc: [],
        label: ''
      },
      endPoint: {
        loc: [],
        label: ''
      },
      phone: '',
      persons: ''
    }
  },
  startPointTap () {
    this.setData({
      startMapShow: !this.data.startMapShow,
      endMapShow: false
    })
  },
  submit (e) {
    console.log(e, this.data.form);
    wx.navigateTo({
      url: '/pages/orders/index'
    })
  },
  endPointTap () {
    this.setData({
      startMapShow: false,
      endMapShow: !this.data.endMapShow
    })
  },
  setUserLocation (lnglat) {
    this.center = lnglat
  },
  getAddressByLnglat (e, id, center) {
    // TODO:
    console.log(center);
    center = this.map.getCenter()
    if (this.data.startMapShow) {
      this.data.form.startPoint.loc = [center.longitude, center.latitude]
    } else if (this.data.endMapShow) {
      this.data.form.endPoint.loc = [center.longitude, center.latitude]
    }
  },
  onLoad () {
    let map = new Map(this)
    map.$on('mapclick', this.getAddressByLnglat)
    map.$on('loaction', this.setUserLocation)
    let device = app.globalData.deviceInfo || app.getDevice() || {windowHeight: 677, windowWidth: 375}
    control.position.left = (device.windowWidth - control.position.width) / 2
    map.addControl(control)
    this.map = map
  }
})
