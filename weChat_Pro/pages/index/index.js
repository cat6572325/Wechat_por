// //index.js
// //获取应用实例
// var app = getApp()
// const {connect} = require( '../../test_lib/wechat-weapp-redux.js' )
// const {addTodo, setVisibilityFilter, toggleTodo} = require( '../actions/index.js' )

//   const pageConfig = {
//   data: {
//     todos: [],
//     filters: [ { key: 'SHOW_ALL', text: '全部' }, { key: 'SHOW_ACTIVE', text: '正在进行' }, { key: 'SHOW_COMPLETED', text: '已完成' }],

//     motto: 'Hello World',
//     ConditionOne: 4,
//     ConditionTwo: '开发阶段',
//     schedule: 50,
//     isState: false, //是否在线
//     iswho: 0,
//     hidemodal: true,

//     lists: [{ image: '/image/a.png', title: '0元设计官网3.0', ConditionOne: 4, ConditionTwo: '开发阶段', cycle: 50 }, { image: '/image/a.png', title: '0元设计官网3.0', ConditionOne: 4, ConditionTwo: '开发阶段', cycle: 100 }],
//     userInfo: {}
//   },
//   //事件处理函数
//   bindViewTap: function () {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function (options) {
//     if (options.iswho == 'developer') {
//       this.setData({
//         iswho: 'developer'
//       })
//     }
//     // this.login()
//   },
//   login: function () {

//     var that = this
//     var mcode, miv, encrypteddata;
//     var nickname
//     //调用登录接口

//     if (!wx.getStorageSync('token')) {
//       wx.login({
//         success: function (res) {
//           console.log(res.code)//code 
//           mcode = res.code;
//           wx.getUserInfo({
//             success: function (res) {
//               miv = res.iv;
//               encrypteddata = res.encryptedData;
//               console.log(res)
//               wx.showToast({
//                 title: res.userInfo.nickName,
//                 icon: 'loading',
//                 duration: 20000
//               })
//               wx.request({
//                 url: 'http://8d58548e.ngrok.io/session',
//                 data: {
//                   code: mcode,
//                   iv: miv,
//                   encryptedData: encrypteddata
//                 },
//                 method: 'GET',
//                 success: function (res) {
//                   console.log(res)
//                   // 将token保存至缓存
//                   wx.setStorageSync('token', res.data.token)
//                   // 调用方法获得个人信息
//                   // that.getMyData()
//                   // 刷新列表
//                   // that.refesh()
//                 },
//                 fail: function (get_data_faild) {
//                   that.setData({
//                     // 在列表之上显示错误文字
//                     failData: get_data_faild.data
//                   })
//                 },
//               })
//             }
//           })
//         },
//         fail: function (login_faild) {
//           console.log(login_faild.errMsg)
//           that.setData({
//             failData: login_faild.data
//           })
//         },
//       })
//     }//如果有token
//     wx.showToast({
//       title: '加载中',
//       icon: 'loading',
//       duration: 500
//     })
//   },
//   item_click: function (v) {
   
//     const id = parseInt( 10 )
//     this.toggleTodo( id );
//      console.log(mapStateToData)
//     // var dat = wx.getStorageSync('iswho')
//     // if (dat == 'developer') {
//     //   wx.navigateTo({ url: '/pages/major_details/major_details?cycle=' + v.currentTarget.dataset.cycle })
//     // } else {
//     //   wx.navigateTo({ url: '/pages/details/details?cycle=' + v.currentTarget.dataset.cycle })
//     // }
//   },
//   switch_Change: function (v) {
//     console.log(v.detail.value)
//     this.setData({
//       isState: v.detail.value
//     })
//   },
//   hide_modal: function (v) {
//     wx.setStorageSync('iswho', 'customer')

//     this.setData({

//       hidemodal: false
//     })
//   },
//   cancel_modal: function (v) {
//     console.log(v)
//     wx.setStorageSync('iswho', 'developer')
//     this.setData({
//       iswho: 1,
//       hidemodal: false
//     })
//     console.log(this.data.iswho)
//   },

//   } //测试

//   // module.exports = todoApp
// const filterTodos = ( todos, filter ) => {
//   switch( filter ) {
//     case 'SHOW_ALL':
//       return todos
//     case 'SHOW_COMPLETED':
//       return todos.filter( t => t.completed )
//     case 'SHOW_ACTIVE':
//       return todos.filter( t => !t.completed )
//     default:
//       throw new Error( 'Unknown filter: ' + filter )
//   }
// }



// const mapStateToData = state => ({
//   todos: filterTodos( state.todos, state.visibilityFilter ),
//   visibilityFilter: state.visibilityFilter
// })

// const mapDispatchToPage = dispatch => ({
//   setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
//   toggleTodo: id => dispatch(toggleTodo(id)),
//   addTodo: event => dispatch(addTodo(event.detail.value.todo)),
// })

// const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
// Page(nextPageConfig);


const {connect} = require( '../../test_lib/wechat-weapp-redux.js' )
const {addTodo, setVisibilityFilter, toggleTodo} = require( '../actions/index.js' )

const pageConfig = {
  data: {
    todos: [],
    filters: [ { key: 'SHOW_ALL', text: '全部' }, { key: 'SHOW_ACTIVE', text: '正在进行' }, { key: 'SHOW_COMPLETED', text: '已完成' }]
  },
  handleCheck: function( e ) {
    const id = parseInt( e.target.id )
    this.toggleTodo( id );
  },
  applyFilter: function( e ) {
    this.setVisibilityFilter( e.target.id )
  },
  onLoad: function() {
    console.log('on load')
  },
  onUnload: function() {
    console.log('on unload')
  }
}

const filterTodos = ( todos, filter ) => {
  switch( filter ) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter( t => t.completed )
    case 'SHOW_ACTIVE':
      return todos.filter( t => !t.completed )
    default:
      throw new Error( 'Unknown filter: ' + filter )
  }
}

const mapStateToData = state => ({
  todos: filterTodos( state.todos, state.visibilityFilter ),
  visibilityFilter: state.visibilityFilter
})

const mapDispatchToPage = dispatch => ({
  setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
  toggleTodo: id => dispatch(toggleTodo(id)),
  addTodo: event => dispatch(addTodo(event.detail.value.todo)),
})

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(nextPageConfig);