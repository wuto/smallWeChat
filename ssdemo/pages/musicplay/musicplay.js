// pages/music/music.js
var app = getApp();
Page({
  data: {

    list: [],
    loadingHidden: false

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    var ids = options.id

    this.requestData(ids);
  },



  /**
       * 请求数据
       */
  requestData: function (_ids) {

    var that = this;
    console.log(_ids);
    //发起网络请求
    wx.request({
      url: app.globalData.blog_url + '/api/playlist/detail',
      data: {
        id: _ids,
      },

      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          list: res.data,
          loadingHidden: true,
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



audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },

  onReady: function () {
    // 页面渲染完成
// 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
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