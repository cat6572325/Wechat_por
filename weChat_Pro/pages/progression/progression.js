// pages/progression/progression.js
Page({
  data:{
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    progressionT: '',//阶段说明
    frontEnd: [], //前端任务
    backStage: [], //后台任务
    backEnd: [], //后端服务器任务
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
    that.loadData(options)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  loadData(v)
  {
      var that=this;
      var url= 'http://api.cbinbin.xyz/project/' + v.pid+'?token='+wx.getStorageSync('token')
      that.setData({
        progressionT: v.text,
      })
      wx.request({
        url: url,
      
        success: function(res){
          console.log(res.data)
          if(v.progression=='going')
          {
          that.setData({
            frontEnd: res.data.schedule.going.taskbars.frontEnd, //前端任务
            backStage: res.data.schedule.going.taskbars.backstage, //后台
            backEnd: res.data.schedule.going.taskbars.backEnd, //后端服务器
            progressionT: res.data.schedule.going.text //阶段说明
          })
          }
        },
        fail: function() {
          // fail
        },
     
      })
  },
  // 滑动切换tab 
  bindChange: function (e) {
    console.log(e)
    var that = this;
    that.setData({ currentTab: e.detail.current });
  }
})