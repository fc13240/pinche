const isArray = module.exports.isArray = (value) => {
  return Array.isArray(value)
}

class Map {
    constructor (page) {
      this.center = {}
      this.page = page
      this.zoom = 14
      this.markers = []
      this.controls = []
      this.locationHandle = null
      this.mapclickhandle = null
      this.markerclickhandle = null
      this.controlclickhandle = null
      this.regionchangestarthandle = null
      this.regionchangeendhandle = null
      this.map = wx.createMapContext('map')
      this.location()
      this.init()
    }
    init () {
      this.setPageMarkers(this.markers)
      this.setPageControls(this.controls)
      this.bindPage()
    }
    bindPage () {
      this.page.maptap = this.maptap.bind(this)
      this.page.markertap = this.markertap.bind(this)
      this.page.controltap = this.controltap.bind(this)
      this.page.location = this.location.bind(this)
      this.page.scaleLarge = this.scaleLarge.bind(this)
      this.page.scaleSmall = this.scaleSmall.bind(this)
      this.page.regionchange = this.regionchange.bind(this)
    }
    setPageMarkers (markers) {
      this.page.setData({ markers })
    }
    setPageControls (controls) {
      this.page.setData({ controls })
    }
    location (cb) {
      let _this = this
      wx.getLocation({
        success (lnglat) {
          _this.setCenter(lnglat)
          _this.locationHandle && _this.locationHandle(lnglat)
          typeof cb === 'function' && cb && cb(lnglat)
        }
      })
    }
    addControl (controls) {
      if (isArray(controls)) {
        this.controls.push(...controls)
      } else {
        this.controls.push(controls)
      }
      this.page.setData({
        controls: this.controls
      })
    }
    addMarker (marker) {
      marker.id = marker.id || this.markers.length
      this.markers.push(marker)
      this.page.setData({
        markers: this.markers
      })
    }
    getMarker (index) {
      return id ? this.markers[index] : this.markers
    }
    move2center () {
      this.map.getCenterLocation({
        success: this.setCenter.bind(this)
      })
    }
    setCenter (lnglat) {
      this.center = lnglat
      this.page.setData({
        center: this.center
      })
    }
    getCenter () {
      return this.center
    }
    scaleLarge () {
      this.page.setData({
        zoom: this.zoom === 16 ? 16 : this.zoom ++
      })
    }
    scaleSmall () {
      this.page.setData({
        zoom: this.zoom === 5 ? 5 : this.zoom --
      })
    }
    markertap (e) {
      let id = e.markerId
      this.markerclickhandle && this.markerclickhandle(e, this.markers[id])
    }
    maptap (e) {
      this.mapclickhandle && this.mapclickhandle(e)
    }
    controltap (e) {
      let id = e.controlId
      this.controlclickhandle && this.controlclickhandle(e, id, this.center)
    }
    regionchange (e) {
      if (e.type === 'begin') {
        this.regionchangestarthandle && this.regionchangestarthandle.call(this.page)
      } else if (e.type === 'end') {
        this.move2center()
        this.regionchangeendhandle && this.regionchangeendhandle.call(this.page)
      }
    }
    $on (eventName, handle) {
      switch (eventName) {
        case 'mapclick':
          this.mapclickhandle = handle
          break
        case 'markerclick':
          this.markerclickhandle = handle
          break
        case 'controlclick':
          this.controlclickhandle = handle
          break
        case 'regionchangestart':
          this.regionchangestarthandle = handle
          break
        case 'regionchangeend':
          this.regionchangeendhandle = handle
          break
        case 'location':
          this.locationHandle = handle
          break
      }
    }
}
module.exports.Map = Map
