// pages/staff/staff.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },

  onShow:function(){
    // 页面显示
  },
  item_click: function(v)
  {
    wx.navigateTo({url: '/pages/personality/personality'})
  }

})