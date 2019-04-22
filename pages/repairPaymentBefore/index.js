// pages/repairPaymentBefore/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "productName": "",
    "productPrice": "",
    "payDetail": [],
    "wxPayMoneyDesc": "",
    "expireTime": "2019-4-22 22:15",
    clock: ''

  
  },
  /* 毫秒级倒计时 */
  count_down: function () {
    var that = this
    //2016-12-27 12:47:08 转换日期格式
    var a = that.data.expireTime.split(/[^0-9]/);
    //截止日期：日期转毫秒
    var expireMs = new Date(that.data.expireTime);
    //倒计时毫秒
    var duringMs = expireMs.getTime() - (new Date()).getTime();
    console.log(expireMs.getTime())
    // 渲染倒计时时钟
    that.setData({
      clock: that.date_format(duringMs)
    });

    if (duringMs <= 0) {
      that.setData({
        clock: "支付已截止，请重新下单"
      });
      // timeout则跳出递归
      return;
    }
    // setTimeout(function () {
    //   // 放在最后--
    //   duringMs -= 10;
    //   that.count_down();
    // }, 1000)
  },
  /* 格式化倒计时 */
  date_format: function (micro_second) {
    var that = this
    // 秒数
    var second = Math.floor(micro_second / 1000);
    // 小时位
    var hr = Math.floor(second / 3600);
    // 分钟位
    var min = that.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
    // 秒位
    var sec = that.fill_zero_prefix(second % 60);// equal to => var sec = second % 60;
    console.log(micro_second)
    return hr + ":" + min + ":" + sec + " ";
  },

  /* 分秒位数补0 */
  fill_zero_prefix: function (num) {
    return num < 10 ? "0" + num : num
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.count_down();
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