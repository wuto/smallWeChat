// pages/me/me.js
var app = getApp()
var mid
Page({
  data: {
    list: [],
    loadingHidden: false
  },

  onLoad: function (options) {
    var ids = options.id
    // 页面初始化 options为页面跳转所带来的参数
    this.requestData(ids);
  },


  //事件处理函数
  musicview: function (event) {

    wx.navigateTo({
      url: '../music/music' + "?id=" + event.currentTarget.dataset.position
    })
  },

  //播放全部
  playall: function (event) {

    wx.navigateTo({
      url: '../musicplay/musicplay' + "?id=" + mid
    })
  },


  /**
     * 请求数据
     */
  requestData: function (ids) {
    mid = ids;
    var that = this;
    console.log(ids);
    //发起网络请求
    wx.request({
      url: app.globalData.blog_url + '/api/playlist/detail',
      data: {
        id: ids
      },

      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          list: res.data,
          loadingHidden: true
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






  onReady: function () {
    // 页面渲染完成
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


