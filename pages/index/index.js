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
<<<<<<< HEAD
      { name: "空调维修" },
      { name: "空调清洗" },
      { name: "空调安装" },
      { name: "空调移机" },
      { name: "空调保养" },
      { name: "空调品牌" },
=======
      { name: "空调维修", icon: 'icon-weixiubeijing', class:'jb1'},
      { name: "空调清洗", icon: 'icon-xifashui', class: 'jb2' },
      { name: "空调安装", icon: 'icon-xiyiji', class: 'jb3'},
      { name: "空调移机", icon: 'icon-banjiapeisong', class: 'jb4'},
      { name: "空调保养", icon: 'icon-jiajubaoyang', class: 'jb5'},
      { name: "空调品牌", icon: 'icon-pinpaitemai-tianchong', class: 'jb6'},
>>>>>>> origin/master
    ]
  },
  
  onLoad: function () {
    
  },
  
})
