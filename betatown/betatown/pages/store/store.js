//index.js
//获取应用实例
var mid
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    ids:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {

    mid = options.id
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        ids:mid
      })
    })
  }
})
