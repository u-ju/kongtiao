// pages/login/index.js
const app = getApp()
var util = require('../../utils/util.js');
var apiurl = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  bindGetUserInfo(e) {
    wx.setStorageSync("token", 1)
    var that = this;
    if (e.detail.userInfo) {
      util.loading()
      var token = ""
      wx.login({
        success: function (res) {
          var data = { wx_code: res.code, wx_appid: 'wxf8d983ac3a653503' }
          if (res.code) {
                wx.getUserInfo({
                  success(res2) {
                    console.log(res2)
                    util.postJSON({
                      apiUrl: apiurl.auth,
                      data: {
                        code: res.code,
                        rawData: res2.rawData,
                        iv: res2.iv,
                        signature: res2.signature,
                        encryptedData: res2.encryptedData
                      }
                    }, function (res3) {
                      console.log(res3)
                      wx.setStorageSync('token', res3.data.token)
                      wx.setStorageSync('wxid', res3.data.wxid)
                      console.log(wx.getStorageSync('wxid'))
                      wx.reLaunch({
                        url: '../index/index',
                      })
                      util.hideLoading()
                    })
                  }
                })
              
          }
        },
        fail(w) {
          util.alert('授权失败')
        }
      })




    } else {
      util.alert("为了您更好的体验,请先同意授权")

    }

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