// pages/design/design.js
Page({
  data:{

    slideshow: false,
    lists: [{image: '/image/a.png'},{image: '/image/a.png'},{image: '/image/a.png'},{image: '/image/a.png'}],
    position: 0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },

  onShow:function(){
    // 页面显示

  },
  hide: function(v)
  {
    this.setData({
      slideshow: false
    })
  },
  image_click: function(v)
  {
    console.log(v.target)
    var that=this;
    that.setData({
      slideshow: true,
      position: v.currentTarget.dataset.index
    })
  }
 
})