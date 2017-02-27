//index.js
//获取应用实例
var mid
var app = getApp()
Page({
  data: {
    objectData: "",
    ids:"",
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    images:[]
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
    this.getData(mid)
  },

  //请求数据
  getData: function (mid) {
    console.log(mid);
    var that = this
    wx.request({
      url: 'http://pe.popcell.cn/mserver/api/getProduct.bdo?loginToken=C5362E4455F94C5DBD86F41241CBAC55&apiKey=app_ios_key&timestamp=1486346497511&sign=a4d6a1d3c3301a08f2fab6c03a3b2773&productId='+mid,
      data: {

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data.object);
        that.setData({
          objectData: res.data.object,
          images:that.imagesformat(res.data.object.imageUrl)
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

//事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

//一些方法
//将字符串通过“;”分割并存入数组
  imagesformat:function(images){
    var iamgestrs = new Array(); //定义一数组
    iamgestrs = images.split(";"); //字符分割 
    return iamgestrs;
  }
})
