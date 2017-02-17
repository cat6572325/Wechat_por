// pages/details/details.js
Page({
  data: {
    startDate: '2017',
    endDate: '2018',
    cycle: 20,
    datas: {},
    title: '',
    schedule: {},//进度详情列表 包括任务和参与人员
    progression: '',
    progression2: '',
    Project_Id: '',
    lists: [{ place: '前端', name: 'computer', head_pic: '/image/a.png', cycle: 20 }]
  },
  onLoad: function (options) {
     this.loadData(options)
  },
  loadData: function (v) {
    var that = this;
    var time1,time2
    that.setData({
      progression: v.progression//进度详情 start&。。
    })
    var url = 'http://api.cbinbin.xyz/project/' + v.pid+'?token='+wx.getStorageSync('token')
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        time1 = res.data.startDate
        time2 = res.data.endDate
        // 获取参与人员总数并增加一个progress整数变量
        // var total = v.developers.backEnd.length + v.developers.backstage.length + v.developers.frontEnd.length;
        var pgs,progression2;
        if (v.progression == 'start')
        { pgs = 100 / 5; progression2 = "开始" }
        if (v.progression == 'pending')
        { pgs = 0; progression2 = "未开始" }
        if (v.progression == 'going')
        { pgs = (100 / 5) * 2; progression2 = "进行中" }
        if (v.progression == 'check')
        { pgs = (100 / 5) * 3; progression2 = "准备上线" }
        if (v.progression == 'finish')
        { pgs = 100; progression2 = "已结束" }
        if (progression2 == '未开始') {//TODO 
          that.setData({
            timeIn: time1, //开始时间
            timeTo: time2, //结束时间
            title: res.data.title, //项目名
            progression: v.progression, //阶段 ， 用于点击阶段详情
            progression2: progression2, //阶段， 中文的
            schedule: res.data.schedule, //项目进度详情 包括任务和参与人员
            Project_Id: v.pid, //项目id
            // 参与人员列表
            // 由于三个方面都是数组，包含许多参数，所以真正使用时需要改成数组判断，根据参数准确设置值
            lists: res.data.developers.frontEnd.concat(res.data.developers.backstage.concat(res.data.developers.backEnd)),
          })
        }
        if(progression2 == '开始')
        {
            that.setData({
            timeIn: time1, //开始时间
            timeTo: time2, //结束时间
            title: res.data.title, //项目名
            progression: v.progression, //阶段 ， 用于点击阶段详情
            progression2: progression2, //阶段， 中文的
            schedule: res.data.schedule, //项目进度详情 包括任务和参与人员
            Project_Id: v.pid, //项目id
            // 参与人员列表
            // 由于三个方面都是数组，包含许多参数，所以真正使用时需要改成数组判断，根据参数准确设置值
            lists: res.data.developers.frontEnd.concat(res.data.developers.backstage.concat(res.data.developers.backEnd)),
          })
    
        }

      },

      fail: function (get_data_faild) {
        wx.showToast({
          title: get_data_faild.data.errMsg,
          icon: 'error',
          duration: 50000
        })
      }
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
        wx.navigateTo({ url: '/pages/progression/progression?pid='+this.data.Project_Id+'&progression='+this.data.progression })
      }
    })