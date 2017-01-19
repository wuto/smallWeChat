// pages/me/me.js
var app=getApp()

Page({
  data:{
   list:[] 
  },

 //事件处理函数
  logitem: function(event) {
   
    wx.navigateTo({
      url: '../playlist/playlist'+"?id="+event.target.dataset.position
    })
  },

  onLoad:function(options){
  var that=this;
    //发起网络请求
    wx.request({
      url: app.globalData.blog_url+'/api/user/playlist',
      data:{
        offset:0,
        limit:1001,
        uid:303438511
        },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       success: function(res){
       console.log(res.data);  
        that.setData({list:res.data})
      },
     
    })


  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})