// pages/music/music.js
var app = getApp();
var mid
var dex=0
  var i = 0
  var animationTime
Page({
  data: {
    list: [],
    loadingHidden: false,
    play: "../../image/music_play.png",
    isplay: false,
    musictime: "00.00",
    curtime: "00.00",
    currentTime: 0,
    lyric: "",
    lyrictime: 0,
    animation: "",
    toplength: 0 ,
    length:0
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
          currentTime: 0,
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
  //播放的时候开始歌词动画（如果歌词有的话）
  play: function () {
    var that = this;
    if (this.data.isplay) {//正在播放
      this.audioCtx.pause(),
       clearInterval(animationTime)//清除动画
        that.setData({
          play: "../../image/music_play.png",
          isplay: false,
          //  animation: that.animation.export()
        })
    } else {//没在播放
      this.audioCtx.play(),
        // this.animation.rotate(360).step(),
      
         animationTime= setInterval(function() {
          
           this.animation.rotate(1 * (++i)).step()

            that.setData({ 
              animation: that.animation.export()
               })

        }.bind(that), 100) 


        that.setData({
          play: "../../image/music_pause.png",
          isplay: true,
          // animation: that.animation.export()
        })

    }
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

    // this.setData({
    //   scrolltop: this.data.scrolltop + 10
    // })

  },

  //播放进度改变时触发
  bindtimeupdate: function (event) {
    var that = this;
    var currenttime = event.detail.currentTime;
      var ccc=  this.data.toplength
      var scro=that.data.toplength;
    if(null!=this.data.lyrictime[dex]&&currenttime * 1000>this.data.lyrictime[dex]){
      scro=that.data.toplength + 10;
      dex=dex+1
    }

    // lyrictime
    this.setData({
      currentTime: currenttime * 1000,
      curtime: that.formarttime(currenttime * 1000),
      toplength: scro
      
    })
  },


  onReady: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    // var ids = options.id
    // 页面渲染完成
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')

    this.requestDataa(mid);

    this.requ();


  },


  /**
       * 实例化一个动画
       */
  requ: function () {
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 100,
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'linear',
      // 延迟多长时间开始
      // delay: 100,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      // transformOrigin: 'top bottom 0',
      success: function (res) {
        console.log(res)
      }
    })


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
          that.qiege(res.data.lyric)
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


    var timesstrs = new Array(); //定义一数组
    var lyricstrs = new Array(); //定义一数组

    var strs = new Array(); //定义一数组
    strs = str.split("\n"); //字符分割 
    for (var i = 0; i < strs.length; i++) {
      var index = strs[i].lastIndexOf("]")
      var timestr = strs[i].slice(1, index)
      var lyricstr = strs[i].slice(index + 1, strs[i].length)
      if (lyricstr == "" || lyricstr == null) {
        lyricstr = "."
      }
      
     timestr= this.setTimems(timestr)
      timesstrs[i] = timestr//将时间转化为毫秒值
      lyricstrs[i] = lyricstr
    }
    this.setData({
      lyric: lyricstrs,
      lyrictime:timesstrs,
      length:lyricstrs.length*44
    })
  },

  //将时间转化为毫秒值
  setTimems: function(timesstrs){
    //  00:00.000
     var strs = new Array(); //定义一数组
    strs = timesstrs.split(":"); //字符分割 
    //strs[0] 分
    //strs[1]//秒
      // strs[1]*1000
      // var str1 = parseInt(strs[1])
    var time=strs[0]*1000*60+strs[1]*1000;
    return time;
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