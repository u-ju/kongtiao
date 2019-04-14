// pages/address_edit/index.js
const app = getApp()
var util = require('../../utils/util.js');
var apiurl = require('../../utils/api.js');
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // 地址
    current: 0,
    areaSelectedStr: '',
    area_id_val: 0,
    disabled: false,
    item: '',
    url: '',
    region: ['四川省', '成都市', '武侯区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.item){
      var item = JSON.parse(options.item)
      this.setData({
        item: item,
        name: item.name,
        phone: item.phone,
        area: item.area,
        address: item.address,
        url: '',
      })
      
    }
  },
  formSubmit(e){
    console.log(e)
    var data = e.detail.value,that = this;
    util.postJSON({apiUrl: apiurl[that.data.url] ,data:data},
     function (res) {
      var result = res.data.result;
       wx.hideLoading()
       util.alert(res.data.message)
       util.navigateBack()
    },function (){
       that.setData({
         disabled: false
       })
      }, function () {
        that.setData({
          disabled: false
        })
      })
  },
  choosearea(e) {
    console.log(e)
    
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})
