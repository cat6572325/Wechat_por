// pages/details/details.js
Page({
  data: {
    startDate: '2017',
    endDate: '2018',
    cycle: 20,
    lists: [{place: '前端',name: 'computer',head_pic: '/image/a.png',cycle: 20}]
  },
  onLoad: function (options) {
    // this.loadData(options)
  },
   loadData: function(v)
  {
    var that=this;

    var url='http://033503a6.ngrok.io/project/'+v.pid
    wx.request({
      url: url,
      method: 'GET', 
      success: function(res){
        console.log(res.data)
        time1=res.data.startEate
        time2=res.data.endDate
            // 获取参与人员总数并增加一个progress整数变量
            var total=v.developers.backEnd.length+v.developers.backstage.length+v.developers.frontEnd.length;
            var pgs;
            if(v.progression=='start')
           {pgs=100/5;v.progression="开始"}
            if(v.progression=='pending')
            {pgs=0;v.progression="未开始"}
            if(v.progression=='going')
          {pgs=(100/5)*2;v.progression="进行中"}
            if(v.progression=='check')
            {pgs=(100/5)*3;v.progression="准备上线"}
            if(v.progression=='finish')
            {pgs=100;v.progression="已结束"}
        if(v.progression=='开始')
        {     
           that.setData({
          timeIn: time1,
          timeTo: time2,
          title: res.data.title,
          // lists: res.datatasks,
        })
        }
        if(v.progression=='未开始')
        {//TODO 
            that.setData({
          timeIn: time1,
          timeTo: time2,
          title: v.title,
          // lists: res.data.taskbars.frontEnd.concat(res.data.taskbars.backstage.concat(res.data.taskbars.backEnd)),
        })
        }
        
        if(v.progression=='开始')
        {     
              that.setData({
          timeIn: time1,
          timeTo: time2,
          title: v.title,
          // lists: res.data.tasks,
        })
        }
        if(v.progression=='进行中')
        {//TODO 
            that.setData({
          timeIn: time1,
          timeTo: time2,
          title: v.title,
          // lists: res.data.taskbars.frontEnd.concat(res.data.taskbars.backstage.concat(res.data.taskbars.backEnd)),
        })
        }
        if(v.progression=='准备上线')
        {//TODO 
             that.setData({
          timeIn: time1,
          timeTo: time2,
          title: v.title,
          // lists: res.data.taskbars.frontEnd.concat(res.data.taskbars.backstage.concat(res.data.taskbars.backEnd)),
        })
        }
        if(v.progression=='已结束')
        {//TODO 
            that.setData({
          timeIn: time1,
          timeTo: time2,
         title: v.title,
          // lists: res.data.taskbars.frontEnd.concat(res.data.taskbars.backstage.concat(res.data.taskbars.backEnd)),
        })
        }
      },
      
      fail: function(get_data_faild) {
        wx.showToast({
          title: get_data_faild.data.errMsg,
          icon: 'error',
          duration: 50000
        })
      },
  item_click: function (v) {
    wx.navigateTo({ url: '/pages/personality/personality' })

  },
  design_click: function (v) {
    wx.navigateTo({ url: '/pages/design/design' })
  },
  help_click: function (v) {
    wx.navigateTo({ url: '/pages/help/help' })
  },
  progression_click: function (v) {
    wx.navigateTo({ url: '/pages/progression/progression' })
  }
})