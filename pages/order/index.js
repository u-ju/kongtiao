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
        "key": "0",
        "name": "全部"
      },
      
      {
        "key": "1",
        "name": "待确认"
      },
      {
        "key": "2",
        "name": "代服务"
      },
      {
        "key": "3",
        "name": "待支付"
      },
      {
        "key": "4",
        "name": "待评价"
      }
    ],
    status:5,
    list:[
      {
        "order_no": "2886746397190412145706000001",
        "source": "sell",
        "order_status": "0",
        "order_amount": "5009.00",
        "comment_status": "0",
        "order_id": "20",
        "order_status_name": "待发货",
        "payment_name": "环保金分期支付",
        "button_arr": [],
        "order_goods": [
          {
            "order_id": "20",
            "spu_id": "2",
            "spu_name": "智能空调",
            "sku_id": "6",
            "sku_name": "黑色-64g",
            "thumb": "https://wyhb-res-pr.zgwyhb.com/uploads/image/2019/03/05/051beb781dfee0576a00fb7bf77cdd3d.jpg",
            "buy_count": "1",
            "real_price": "3999.00"
          }
        ]
      },
    {
      "order_no": "2886746397190403161852000001",
      "source": "sell",
      "order_status": "0",
      "order_amount": "3990.00",
      "comment_status": "0",
      "order_id": "15",
      "order_status_name": "待发货",
      "payment_name": "环保金分期支付",
      "button_arr": [],
      "order_goods": [
        {
          "order_id": "15",
          "spu_id": "1",
          "spu_name": "金鹰1号",
          "sku_id": "1",
          "sku_name": "红色-510*160*385mm",
          "thumb": "https://wyhb-res-pr.zgwyhb.com/uploads/image/2019/03/21/b0a8bedee5527ed4fd3f146852684094.png",
          "buy_count": "1",
          "real_price": "3990.00"
        }
      ]
    },
    {
      "order_no": "2886746397190403153345000001",
      "source": "sell",
      "order_status": "1",
      "order_amount": "5298.00",
      "comment_status": "0",
      "order_id": "14",
      "order_status_name": "待收货",
      "payment_name": "环保金分期支付",
      "button_arr": [
        {
          "key": "logistics",
          "name": "查看物流"
        },
        {
          "key": "receive",
          "name": "确认收货"
        }
      ],
      "order_goods": [
        {
          "order_id": "14",
          "spu_id": "7",
          "spu_name": "爱卿AQ-A6分质供水带超滤（金色）A6分质供水带超滤（金色）",
          "sku_id": "7",
          "sku_name": "金色-510*160*385mm",
          "thumb": "https://wyhb-res-pr.zgwyhb.com/uploads/image/2019/03/21/7a8accfe8702577b31ac19fbb1ea9ed1.png",
          "buy_count": "1",
          "real_price": "5199.00"
        }
      ]
    },
    ]
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
  onTabsChange(e) {
    console.log(e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
    this.setData({
      status: this.data.tabs[index].id
    })
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
      status: this.data.tabs[index].id
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