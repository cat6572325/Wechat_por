// pages/major_details/major_details.js
Page({
  data:{
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
  onShow:function(){
    // 页面显示
  },
  radio_click: function(v)
  {
    console.log(v)
  }

})