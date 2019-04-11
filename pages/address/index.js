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
     
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  choose(e) {
    var list = this.data.list
    var that = this;
    console.log()
    
  },
  init() {
    var that = this;
    
  },
  detail(e){
    console.log(e)
    wx.navigateTo({
      // url: '../address_edit/index?item=' +,
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
          data["address_id[0]"] = e.currentTarget.dataset.id
          
        } else {
          console.log('用户点击取消')
        }

      }
    })
    
  },
  onShow(){
  }
})