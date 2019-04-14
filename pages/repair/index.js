// pages/repair/index.js
const app = getApp()

Page({
  data: {
    visible2: false,
    scrollTop: 0,
    last_scrollTop: 0,
    toView: 'page0',
    navActive: 0,
    lastActive: 0,
    s_height: '',
    height_arr: [],
    category: [
      { categoryName: '服务' },
      { categoryName: '收费标准' },
      { categoryName: '详情' },
      { categoryName: '评价' }
    ],
    detail: [
      [{ goodsName: '可比克薯片', goodsPrice: '3.8' }, { goodsName: '巧克力', goodsPrice: '10.8' }, { goodsName: '旺仔小馒头', goodsPrice: '8.0' }, { goodsName: '烤馍片', goodsPrice: '1.0' }],
      [{ goodsName: '可口可乐', goodsPrice: '2.5' }, { goodsName: '脉动', goodsPrice: '4.5' }, { goodsName: '7喜', goodsPrice: '3.0' }, { goodsName: '康师傅矿泉水', goodsPrice: '1.0' }],
      [{ goodsName: '牙刷', goodsPrice: '2.5' }, { goodsName: '拖鞋', goodsPrice: '8.0' }, { goodsName: '胶带', goodsPrice: '3.0' }, { goodsName: '笔记本', goodsPrice: '3.0' }],
      [{ goodsName: '小米6', goodsPrice: '2499.0' }, { goodsName: '华为p10', goodsPrice: '2099.0' }, { goodsName: '荣耀20', goodsPrice: '1699.0' }, { goodsName: '红米6', goodsPrice: '899.0' }],
    ],
    item:[
      { icon: 'icon-shijian', title: '时效保障', intr: '3分钟响应' },
      { icon: 'icon-qian', title: '明码标价', intr: '服务费公开透明' },
      // { icon: 'icon-xiyiji', title: '时效保障', intr: '3分钟响应' },
    ]
  },
  tap: function (e) {
    console.log(e)
    // var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      toView: 'view' + index,
      navActive: index
    });
    
    
  },
  
  scroll: function (e) {
    this.setData({
      intoView: "view" + e.currentTarget.dataset.id
    })
  },
  onLoad: function () {
    var height=0,that = this,allheight=[]
    console.log()
      that.setData({
        s_height: wx.getSystemInfoSync().windowHeight - 50
      })
  },
  getHeightArr: function (self) {
    var height = 0, height_arr = [], details = self.data.detail, s_height = self.data.s_height;
    for (var i = 0; i < details.length; i++) {
      var last_height = 30 + details[i].length * 90;
      if (i == details.length - 1) {
        last_height = last_height > s_height ? last_height : s_height + 50;
      }
      height += last_height;

      height_arr.push(height);
    }
    self.setData({
      height_arr: height_arr
    });
  },
  open2() {
    console.log(1)
    this.setData({
      visible2: true,
    })
  },
  onClose2() {
    this.onClose('visible2')
  },
  onClose(key) {
    console.log('onClose')
    this.setData({
      [key]: false,
    })
  },
})