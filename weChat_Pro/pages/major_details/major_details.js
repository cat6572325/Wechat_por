// pages/major_details/major_details.js
Page({
  data:{
        winWidth: 0,
    winHeight: 0,
    title: '',
    timeIn: '',
    timeTo: '',
    date: '',
    possessor: '',
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
    // that.loadData(options)
  },
  onShow:function(){
    var total;
      var time1='2017.10.7'//res.data.start.time[0];
          var time2='2018.10.7'//res.data.start.time[1];
          var times1=time1.split('.')
          var times2=time2.split('.')
          var year=times2[0]-times1[0],month=times2[1]-times1[1],day=times2[2]-times1[2];
          total=year*365
          total+=month*30
          total+=day
          console.log(total)
          
    
  },
  radio_click: function(v)
  {
    console.log(v)
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
        
        if(v.progression=='开始')
        {     
          var time1=res.data.start.time[0];
          var time2=res.data.start.time[1];
          var times1=time1.split('.')
          var times2=time2.split('.')
          var year=times2[0]-times1[0],month=times2[1]-times1[1],day=times2[2]-times1[2];
          total=year*365
          total+=month*30
          total+=day
             that.setData({
          timeIn: time1,
          timeTo: time2,
          date: total,
          title: v.title,
          lists: res.datatasks,
          possessor: res.data.possessor,
        })
        }
        if(v.progression=='未开始')
        {//TODO 
              var time1=res.data.pending.time[0];
          var time2=res.data.pending.time[1];
          var times1=time1.split('.')
          var times2=time2.split('.')
          var year=times2[0]-times1[0],month=times2[1]-times1[1],day=times2[2]-times1[2];
          total=year*365
          total+=month*30
          total+=day
             that.setData({
          timeIn: time1,
          timeTo: time2,
          date: total,
          title: v.title,
          possessor: res.data.possessor,
          // lists: res.data.taskbars.frontEnd.concat(res.data.taskbars.backstage.concat(res.data.taskbars.backEnd)),
        })
        }
        
        if(v.progression=='开始')
        {     
          var time1=res.data.start.time[0];
          var time2=res.data.start.time[1];
          var times1=time1.split('.')
          var times2=time2.split('.')
          var year=times2[0]-times1[0],month=times2[1]-times1[1],day=times2[2]-times1[2];
          total=year*365
          total+=month*30
          total+=day
             that.setData({
          timeIn: time1,
          timeTo: time2,
          date: total,
          title: v.title,
          lists: res.data.tasks,
          possessor: res.data.possessor,
        })
        }
        if(v.progression=='进行中')
        {//TODO 
              var time1=res.data.going.time[0];
          var time2=res.data.going.time[1];
          var times1=time1.split('.')
          var times2=time2.split('.')
          var year=times2[0]-times1[0],month=times2[1]-times1[1],day=times2[2]-times1[2];
          total=year*365
          total+=month*30
          total+=day
             that.setData({
          timeIn: time1,
          timeTo: time2,
          date: total,
          title: v.title,
          possessor: res.data.possessor,
          lists: res.data.taskbars.frontEnd.concat(res.data.taskbars.backstage.concat(res.data.taskbars.backEnd)),
        })
        }
        if(v.progression=='准备上线')
        {//TODO 
              var time1=res.data.check.time[0];
          var time2=res.data.check.time[1];
          var times1=time1.split('.')
          var times2=time2.split('.')
          var year=times2[0]-times1[0],month=times2[1]-times1[1],day=times2[2]-times1[2];
          total=year*365
          total+=month*30
          total+=day
             that.setData({
          timeIn: time1,
          timeTo: time2,
          date: total,
          title: v.title,
          possessor: res.data.possessor,
          // lists: res.data.taskbars.frontEnd.concat(res.data.taskbars.backstage.concat(res.data.taskbars.backEnd)),
        })
        }
        if(v.progression=='已结束')
        {//TODO 
              var time1=res.data.finish.time[0];
          var time2=res.data.finish.time[1];
          var times1=time1.split('.')
          var times2=time2.split('.')
          var year=times2[0]-times1[0],month=times2[1]-times1[1],day=times2[2]-times1[2];
          total=year*365
          total+=month*30
          total+=day
             that.setData({
          timeIn: time1,
          timeTo: time2,
          date: total,
          title: v.title,
          possessor: res.data.possessor,
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
    
    })
  }
})