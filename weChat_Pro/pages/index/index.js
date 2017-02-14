//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    ConditionOne: 4,
    ConditionTwo: '开发阶段',
    schedule: 50,
    isState: false, //是否在线
    iswho: 0,
    hidemodal: true,

    lists: [{ image: '/image/a.png', title: '0元设计官网3.0', ConditionOne: 4, ConditionTwo: '开发阶段', cycle: 50 }, { image: '/image/a.png', title: '0元设计官网3.0', ConditionOne: 4, ConditionTwo: '开发阶段', cycle: 100 }],
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    if (options.iswho == 'developer') {
      this.setData({
        iswho: 'developer'
      })
    }
    // this.login()
  },
  login: function () {

    var that = this
    var mcode, miv, encrypteddata;
    var nickname
    //调用登录接口

    if (!wx.getStorageSync('token')) {
      wx.login({
        success: function (res) {
          console.log(res.code)//code 
          mcode = res.code;
          wx.getUserInfo({
            success: function (res) {
              miv = res.iv;
              encrypteddata = res.encryptedData;
              console.log(res)
              wx.showToast({
                title: res.userInfo.nickName,
                icon: 'loading',
                duration: 20000
              })
              wx.request({
                url: 'http://8d58548e.ngrok.io/session',
                data: {
                  code: mcode,
                  iv: miv,
                  encryptedData: encrypteddata
                },
                method: 'GET',
                success: function (res) {
                  console.log(res)
                  // 将token保存至缓存
                  wx.setStorageSync('token', res.data.token)
                  // 调用方法获得个人信息
                  // that.getMyData()
                  // 刷新列表
                  // that.refesh()
                },
                fail: function (get_data_faild) {
                  that.setData({
                    // 在列表之上显示错误文字
                    failData: get_data_faild.data
                  })
                },
              })
            }
          })
        },
        fail: function (login_faild) {
          console.log(login_faild.errMsg)
          that.setData({
            failData: login_faild.data
          })
        },
      })
    }//如果有token
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
  },
  item_click: function (v) {
    var dat = wx.getStorageSync('iswho')
    if (dat == 'developer') {
      wx.navigateTo({ url: '/pages/major_details/major_details?cycle=' + v.currentTarget.dataset.cycle })
    } else {
      wx.navigateTo({ url: '/pages/details/details?cycle=' + v.currentTarget.dataset.cycle })
    }
  },
  switch_Change: function (v) {
    console.log(v.detail.value)
    this.setData({
      isState: v.detail.value
    })
  },
  hide_modal: function (v) {
    wx.setStorageSync('iswho', 'customer')

    this.setData({

      hidemodal: false
    })
  },
  cancel_modal: function (v) {
    console.log(v)
    wx.setStorageSync('iswho', 'developer')
    this.setData({
      iswho: 1,
      hidemodal: false
    })
    console.log(this.data.iswho)
  }
})
