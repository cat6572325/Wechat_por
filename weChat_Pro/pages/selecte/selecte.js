// pages/selecte/selecte.js
Page({
  data:{

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  customer: function(v)
  {
    wx.setStorageSync('is','cutomer')
    wx.navigateTo({ url: '/pages/index/index?is=cutomer'})
  },
  developer: function(v)
  {
    wx.setStorageSync('is', 'developer')
    console.log(v)
wx.navigateTo({
  url: '/pages/details/details',
  success: function(res){
    // success
  },
  fail: function() {
    // fail
  },
  complete: function() {
    // complete
  }
})
  }

})