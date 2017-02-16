//index.js
//获取应用实例
var app = getApp()
// 引用方法
const {connect} = require('../../test_lib/wechat-weapp-redux.js')
const {addTodo, setVisibilityFilter, toggleTodo} = require('../actions/index.js')

// 在页面的定义上使用connect,绑定redux store到页面上。
const pageConfig = {
  data: {
    todos: [],
    filters: [{ key: 'SHOW_ALL', text: '全部' }, { key: 'SHOW_ACTIVE', text: '正在进行' }, { key: 'SHOW_COMPLETED', text: '已完成' }],
    ConditionOne: 4,
    ConditionTwo: '开发阶段',
    schedule: 50,
    isState: false, //是否在线
    iswho: 0,
    hidemodal: true,
    lists: [{ progression: '开始', title: '0元设计官网3.0',picture: '/image/a.png',_id: '58a1285842f6830ec0862b3f',quantity: '10' }],
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
    this.login()
  },
  login: function () {

    var that = this
    var mcode, miv, encrypteddata;
    var nickname
    //调用登录接口


      wx.login({
        success: function (res) {
          mcode = res.code;
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              miv = res.iv;
              encrypteddata = res.encryptedData;
              wx.showToast({
                title: res.userInfo.nickName,
                icon: 'loading',
                duration: 2000
              })
              wx.request({
                url: 'http://033503a6.ngrok.io/session',
                data: {
                  code: mcode,
                  iv: miv,
                  newteo: '75c7f6343b26609d58160ae8e13c3c5a0e2847fd',
                  encryptedData: encrypteddata
                },
                method: 'GET',
                success: function (res) {
                  console.log(res)
                  // 将token保存至缓存
                  wx.setStorageSync('token', res.data.token)
                  that.projects()

                },
                fail: function (get_data_faild) {
                  var error = get_data_faild.data
                  wx.showToast({
                    title: error,
                    icon: 'error',
                    duration: 50000
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
    //如果有token
  },
  projects: function () {
    // 查看项目列表
    var that = this;
    var url = 'http://033503a6.ngrok.io/project?token=' + wx.getStorageSync('token');
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          lists: res.data.map((v) => {
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
                return Object.assign(v, { quantity: total,progres: pgs})//修改列表item中的内容，每个item增加三个参数
              })
        })
      },
      fail: function (get_data_faild) {
        
        wx.showToast({
          title: get_data_faild.data.errMsg,
          icon: 'error',
          duration: 50000
        })
      },

    })
  },

  item_click: function (v) {
    var dat = wx.getStorageSync('iswho')
    var pid= v.currentTarget.dataset.pid;
    console.log(v)
    if (dat == 'developer') {
      wx.navigateTo({ url: '/pages/major_details/major_details?cycle=' + v.currentTarget.dataset.cycle+'&title='+v.target.dataset.title+'&pid='+pid })
    } else {
      wx.navigateTo({ url: '/pages/details/details?cycle=' + v.currentTarget.dataset.cycle+'&title='+v.target.dataset.title+'&pid='+pid})
    }
  },
  switch_Change: function (v) {
    // 开发者主动更改工作状态
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
    wx.setStorageSync('iswho', 'developer')
    this.setData({
      iswho: 1,
      hidemodal: false
    })
  },

} //测试

// module.exports = todoApp
const filterTodos = (todos, filter) => {
  console.log('1')
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

// 页面的定义
const mapStateToData = state => ({
  todos: state.todos,
  visibilityFilter: state.visibilityFilter
})
// 定义要映射哪些state到页面
const mapDispatchToPage = dispatch => ({
  setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
  toggleTodo: id => dispatch(toggleTodo(id)),
  addTodo: text => dispatch(addTodo(text)),
})
// 定义要映射哪些方法到页面
const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
// 使用connect将上述定义添加到pageConfig中。
Page(nextPageConfig);
