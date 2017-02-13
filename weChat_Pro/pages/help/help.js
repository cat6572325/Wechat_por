var WxParse = require('../../wxParse/wxParse.js')
var timer = null;
Page({
  data: {
    loadTips: '',
    slideshow: false,
    lists: [
    ],
    // selectedId: 0,

  },

  // 页面加载执行
  onLoad: function () {
    this.getImages();
    var that = this
    WxParse.emojisInit('[]', "/wxParse/emojis/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "11.gif",
      "12": "12.gif",
      "13": "13.gif",
      "14": "14.gif",
      "15": "15.gif",
      "16": "16.gif",
      "17": "17.gif",
      "18": "18.gif",
      "19": "19.gif",
    });
    var secondMD = `# H1  
- - H2\n
> hh，

### H3

#### H4
##### H5

###### H6
####我是一段MARKDOWN文字
[I'm an inline-style link](https://www.google.com)`
    WxParse.wxParse('article', 'md', secondMD, that);
    console.log(secondMD)
    var html = `<h1>我是一段HTML文字</h1>
  <a href="http://www.baidu.com">百度</a>`
    WxParse.wxParse('html', 'html', html, that);
  },
  wxParseTagATap: function (e) {
    var href = e.currentTarget.dataset.src;
    console.log(href);
    //我们可以在这里进行一些路由处理
    // if(href.indexOf(index) > 0){
    //   wx.redirectTo({
    //     url: '../index/index'
    //   })

    // }

  },
  // 加载图片数据（自己改成异步）
  getImages: function () {
    var that = this;

    // 加载前
    that.setData({
      loadTips: '加载中...'
    });

    // 请求成功
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      that.setData({
        loadTips: '',
        images: [{
          smallSrc: 'http://i.imgur.com/PlQTmYt.jpg',
          bigSrc: 'http://i.imgur.com/PlQTmYt.jpg',
          id: 0,
        }, {
          smallSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/05/1C/oYYBAFguvUCAIlZIAADZfrIYZMc256.jpg?imageView2/1/w/100/h/100/interlace/1/q/100',
          bigSrc: '/iamge/watched_icon.png',
          id: 1
        }, {
          smallSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/02/B3/ooYBAFd6G-yAPvRDAABpsEdMlO4123.jpg?imageView2/1/w/100/h/100/interlace/1/q/100',
          bigSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/02/B3/ooYBAFd6G-yAPvRDAABpsEdMlO4123.jpg?imageView2/1/interlace/1/q/100',
          id: 2,
        }, {
          smallSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/02/48/oYYBAFdfoT6Aci-4AAFpUdToI6w409.jpg?imageView2/1/w/100/h/100/interlace/1/q/100',
          bigSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/02/48/oYYBAFdfoT6Aci-4AAFpUdToI6w409.jpg?imageView2/1/interlace/1/q/100',
          id: 3
        }]
      })
    }, 1000);
  },

 
})