//index.js
var app = getApp()

Page({
  data: {
    list: [],
    loadingHidden: false
  },

  //事件处理函数
  logitem: function (event) {

    wx.navigateTo({
      url: '../playlist/playlist' + "?id=" + event.currentTarget.dataset.position
    })
  },



  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.requestData('newlist');
  },

  /**
   * 上拉刷新
   */
  bindscrolltoupper: function () {
    //加载最新
    this.requestData('newlist');
  },

  /**
   * 加载更多
   */
  bindscrolltolower: function () {
    console.log('到底部')
    //加载更多
    this.requestData('list');
  },
  /**
   * 请求数据
   */
  requestData: function (a) {
    var that = this;
    wx.request({
      url: app.globalData.blog_url + '/api/user/playlist/?offset=0&limit=1001',
      data: {
        uid: 303438511,
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          // 拼接数组

          list: res.data,
          loadingHidden: true,

        })
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
