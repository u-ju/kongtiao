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
    disabled: false,
    item: '',
    url: 'addAddress',
    region: ['请选择', '', ''],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.item){
      var item = JSON.parse(options.item)
      this.setData({
        item: item,
        id:item.id,
        appointments: item.appointments,
        phone: item.phone,
        region: item.address.split(' '),
        housenumber: item.housenumber,
        url: 'updateAddress',
      })
      
    }
  },
  formSubmit(e){
    
    var data = e.detail.value,that = this;
    data.address = that.data.region.join(' ')
    if(this.data.item){
      data.id = that.data.id
    }else{
      data.wxid = wx.getStorageSync('wxid')
    }
    console.log(data)
    util.postJSON({apiUrl: apiurl[that.data.url] ,data:data},
     function (res) {
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
