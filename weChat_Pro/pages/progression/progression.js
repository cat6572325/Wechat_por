// pages/progression/progression.js
Page({
  data:{
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
  },
  onLoad:function(options){
    var that=this;
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData(
          {
            winWidth: res.windowWidth,
            winHeight: res.windowHeight
          });
      }
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  // 滑动切换tab 
  bindChange: function (e) {
    console.log(e)
    var that = this;
    that.setData({ currentTab: e.detail.current });
  }
})