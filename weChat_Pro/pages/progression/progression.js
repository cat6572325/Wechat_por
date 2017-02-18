// pages/progression/progression.js
Page({
  data: {
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    time: '', //顶部周期
    progressionT: '',//阶段说明
    frontEnd: [], //前端任务
    backStage: [], //后台任务
    backEnd: [], //后端服务器任务
    progression: '', //用于判断显示的阶段ui
    tasks: [], //开始阶段的工作目录
    text: '' //结束时的调用
  },
  onLoad: function (options) {
    var that = this;
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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  loadData(v) {
    var that = this;
    var url = 'http://api.cbinbin.xyz/project/' + v.pid + '?token=' + wx.getStorageSync('token')
    that.setData({
      progressionT: v.text,
    })
    wx.request({
      url: url,

      success: function (res) {
        console.log(res.data)
        if (v.progression == 'pending') {
          that.setData({
            progressionT: '项目未开始',
            time: res.data.schedule.pending.time[0],
          })
        }

        if (v.progression == 'start') {
          that.setData({
            progression: 'start',
            progressionT: res.data.schedule.start.text, //阶段说明
            tasks: res.data.tasks, //任务列表
            time: res.data.schedule.start.time[0] + res.data.schedule.start.time[1],
          })
        }
        if (v.progression == 'going') {
          that.setData({
            frontEnd: res.data.schedule.going.taskbars.frontEnd, //前端任务
            backStage: res.data.schedule.going.taskbars.backstage, //后台
            backEnd: res.data.schedule.going.taskbars.backEnd, //后端服务器
            progressionT: res.data.schedule.going.text //阶段说明
          })
        }
        if (v.progression == 'check') {
          that.setData({
            progressionT: '该项目正部署上线',
            time: res.data.schedule.check.time[0] + res.data.schedule.check.time[1],
          })
        }
        if (v.progression == 'finish') {
          that.setData({
            progressionT: '改项目已结束',
            time: res.data.schedule.finish.time[0],
            text: res.data.schedule.finish.text,
          })
        }
      },
      fail: function (erro) {
        console.log(erro)
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