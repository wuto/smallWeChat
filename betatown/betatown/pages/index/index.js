//index.js
//获取应用实例
Page({
  data: {
    headImgUrls: [],
    brandImageUrls: [],
    hotImageUrls: [],
    memberImageUrls: [],
    recommendImageUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  onLoad: function () {
    this.getTopImageData()

  },

  getTopImageData: function () {
    var that = this
    wx.request({
      url: 'http://pe.popcell.cn/mserver/api/findIndexColumnDataForApp.bdo?loginToken=C5362E4455F94C5DBD86F41241CBAC55&apiKey=app_ios_key&timestamp=1486346439089&sign=4d5072f0b46cb3d7566e71ab4e58fb11',
      data: {

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        var headData;
        var brandData;
        var hotData;
        var memberData;
        var recommendData;
        var i;
        for(i=0;i<res.data.items.length;i++){
          if(res.data.items[i].type == "advertisementList"){
            headData = res.data.items[i].itemDataList;
          }else if(res.data.items[i].type == "brandList"){
            brandData = res.data.items[i].itemDataList;
          }else if(res.data.items[i].type == "productList"){
            if(res.data.items[i].name == "爆款专区"){
              hotData = res.data.items[i].itemDataList;
            }else if(res.data.items[i].name == "精选商品"){
              memberData = res.data.items[i].itemDataList;
            }else if(res.data.items[i].name == "推荐商品"){
            recommendData = res.data.items[i].itemDataList;
            }
          }
        }
        that.setData({
          // headImgUrls: res.data.items[0].itemDataList,
          headImgUrls: headData,
          brandImageUrls: brandData,
          hotImageUrls: hotData,
          memberImageUrls: memberData,
          recommendImageUrls: recommendData
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

// 点击方法
  open_details: function (event) {
    wx.navigateTo({
      url: '../details/details'+ "?id=" + event.currentTarget.dataset.position
    })
  }
  
})
