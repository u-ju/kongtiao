// pages/address/index.js
const app = getApp()
var util = require('../../utils/util.js');
var apiurl = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { address:"我是详细地址",
      address_id: "3",
      area_id: "5",
      area_name: "四川省 成都市 金牛区",
      default: "1",
      name: "李二狗",
      phone: "15198065466"
      },
      {
        address: "我是详细地址",
        address_id: "3",
        area_id: "5",
        area_name: "四川省 成都市 金牛区",
        default: "0",
        name: "李二狗",
        phone: "15198065466"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.loading()
  },
  choose(e) {
    
    var that = this;
    util.postJSON({
      apiUrl: apiurl.updateUserFalg,
      data: {
        id: e.currentTarget.dataset.id,
        wxid: wx.getStorageSync('wxid')
      }
    }, function (res) {
      console.log(res.data)
      that.init()
    })
  },
  init() {
    var that = this;
    util.postJSON({
      apiUrl: apiurl.findAdress,
      data: {
        wxid: wx.getStorageSync('wxid')
      }
    }, function (res) {
      console.log(res.data)
      var data = res.data
      util.hideLoading()
      that.setData({
        data: data
      })
    })
  },
  detail(e){
    console.log(e)
    wx.navigateTo({
      url: '../address_edit/index?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  delete(e){
    console.log(e.currentTarget.dataset.id)
    var data=[],that = this;
    wx.showModal({
      title: '提醒',
      content: '是否确定删除地址？',
      cancelText: '否',
      cancelColor: '#2EB354',
      confirmText: '是',
      confirmColor: '#444444',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          data.id= e.currentTarget.dataset.id
          util.postJSON({
            apiUrl: apiurl.delAddress,
            data: {
              id: e.currentTarget.dataset.id
            }
          }, function (res) {
            console.log(res.data)
            that.init()
          })
        } else {
          console.log('用户点击取消')
        }

      }
    })
    
  },
  onShow(){
    this.init()
  }
})