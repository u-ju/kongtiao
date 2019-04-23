// pages/order/index.js
const app = getApp()
var util = require('../../utils/util.js');
var apiurl = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs :[
      {
        "key": "5",
        "name": "全部"
      },
      {
        "key": "0",
        "name": "待支付"
      },
      {
        "key": "1",
        "name": "待确认"
      },
      {
        "key": "2",
        "name": "待服务"
      },
      {
        "key": "3",
        "name": "已完成"
      },
      {
        "key": "4",
        "name": "已评价"
      }
    ],
    status:5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },
  init(status=''){
    var that = this;
    util.postJSON({
      apiUrl: apiurl.getOrder ,
      data: {
        wxid: wx.getStorageSync('wxid'),
        status: status
      }
    }, function (res3) {
      console.log(res3.data)
      that.setData({
        list: res3.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onTabsChange(e) {
    console.log(e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
    this.setData({
      status: this.data.tabs[index].key
    })
    this.init(this.data.tabs[index].key)
  },
  onSwiperChange(e) {
    util.loading()
    const { current: index, source } = e.detail
    const { key } = this.data.tabs[index]

    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
    this.setData({
      status: this.data.tabs[index].key
    })
    that
  },
  detail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../repairPaymentBefore/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})