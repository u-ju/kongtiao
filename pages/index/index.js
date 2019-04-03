//index.js
//获取应用实例
const app = getApp()
         
Page({
  data: {
    indicatorDots: true,//显示面板指示点
    autoplay: true,//自动播放
    beforeColor: "white",//指示点颜色
    afterColor: "coral",//当前选中的指示点颜色
    beforeColor1: '#2EB354',
    interval: 10000,
    interval1: 6000,
    duration: 1000,
    banner:[
      { image: '../../images/index.jpg' },
      { image: '../../images/index.jpg' },
      { image: '../../images/index.jpg' },
    ],
    tag:[
      { name: "空调维修", icon: 'icon-weixiubeijing'},
      { name: "空调清洗", icon: 'icon-xifashui' },
      { name: "空调安装", icon: 'icon-xiyiji'},
      { name: "空调移机", icon: 'icon-banjiapeisong'},
      { name: "空调保养", icon: 'icon-jiajubaoyang'},
      { name: "空调品牌", icon: 'icon-pinpaitemai-tianchong'},
    ]
  },
  
  onLoad: function () {
    
  },
  
})
