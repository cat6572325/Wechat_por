// pages/details/details.js
Page({
  data:{
    startDate: '2017',
    endDate: '2018',
    cycle: 20,

  },
  onLoad:function(options){
    console.log(options.cycle)
    this.setData({
      cycle: options.cycle
    })
  },

  onShow:function(){
    // 页面显示
  },
item_click: function(v)
{
  wx.navigateTo({url: '/pages/personality/personality'})
  
},
design_click: function(v)
{
    wx.navigateTo({url: '/pages/design/design'})
},
help_click: function(v)
{
  wx.navigateTo({url: '/pages/help/help'})
}
})