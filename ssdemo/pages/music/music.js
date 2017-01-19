// pages/music/music.js
var app = getApp();
var mid
Page({
  data: {
    list: [],
    loadingHidden: false,
    play: "../../image/music_play.png",
    isplay: false,
    musictime: "00.00",
    curtime: "00.00",
    currentTime: 0,
    lyric: ""
  },
  
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

     mid = options.id

    this.requestData(mid);
  },



  /**
    * 请求数据
    */
  requestData: function (_ids) {

    var that = this;
    console.log(_ids);
    //发起网络请求
    wx.request({
      url: app.globalData.blog_url + '/api/song/detail',
      data: {
        id: _ids,
        ids: '[' + _ids + ']'
      },

      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          list: res.data,
          loadingHidden: true,
          musictime: that.formarttime(res.data.songs[0].duration),
          currentTime: 0
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  //播放 暂停
  play: function () {
    var that = this;
    if (this.data.isplay) {
      this.audioCtx.pause(),
        that.setData({
          play: "../../image/music_play.png",
          isplay: false

        })
    } else {
      this.audioCtx.play(),
        that.setData({
          play: "../../image/music_pause.png",
          isplay: true
        })

    }
  },

  audio14: function () {
    this.audioCtx.seek(16.8)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },


  //格式化音乐时间
  formarttime: function (time) {
    var sec = time / 1000 / 60
    var ms = time / 1000 % 60
    sec = Math.floor(sec)
    sec = this.padNumber(sec, 2)
    ms = Math.floor(ms)
    ms = this.padNumber(ms, 2)
    return sec + '.' + ms
  },

  //给数字字符串补零，不支持负数
  padNumber: function (num, fill) {
    //改自：http://blog.csdn.net/aimingoo/article/details/4492592
    var len = ('' + num).length;
    return (Array(
      fill > len ? fill - len + 1 || 0 : 0
    ).join(0) + num);
  },

  //  foo:function(str){
  //     str ='0'+str;
  //     return str.substring(str.length-2,str.length);
  // },


  //滑动条的滑动事件（滑动完成）
  slider1change: function (event) {

    var that = this;
    var time = event.detail.value;
    this.setData({
      curtime: that.formarttime(time)
    })
    var i = time / 1000
    this.audioCtx.seek(time / 1000)



  },

  //播放进度改变时触发
  bindtimeupdate: function (event) {
    var that = this;
    var currenttime = event.detail.currentTime;
    this.setData({
      currentTime: currenttime * 1000,
      curtime: that.formarttime(currenttime * 1000)
    })
  },


  onReady: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    // var ids = options.id
    // 页面渲染完成
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')

    this.requestDataa(mid);


  },



  /**
     * 请求歌词
     */
  requestDataa: function (_ids) {

    var that = this;
    console.log(_ids);
    if (this.data.lyric == null || that.data.lyric == "") {
      //发起网络请求
      wx.request({
        url: app.globalData.blog_url + '/api/song/media',
        data: {
          id: _ids,
        },

        method: 'GET',
        success: function (res) {
          console.log(res.data);
          that.setData({
            lyric: that.qiege(res.data.lyric)
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }


  },

//切割字符串

 qiege: function (str) {

var strs= new Array(); //定义一数组
strs=str.split("\n"); //字符分割 
return strs;
 },

  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }











})