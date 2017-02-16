const {createStore} = require('./test_lib/redux.js');
const reducer = require('./reducers/index.js');
const store = createStore(reducer) // redux store
const {Provider} = require('./test_lib/wechat-weapp-redux.js');
const configureStore = require('./configureStore.js');
App(Provider(store)({

    onLaunch: function () {
      //调用API从本地缓存中获取数据
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
    },
    getUserInfo: function (cb) {
      var that = this
      if (this.globalData.userInfo) {
        typeof cb == "function" && cb(this.globalData.userInfo)
      } else {
        //调用登录接口
        wx.login({
          success: function () {
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          }
        })
      }
    },
    globalData: {
      userInfo: null
    }
    
  })
  
  )
  