var _function = require('../../../utils/functionData.js');
var app = getApp()
Page({
    data:{
        userInfo:{},
        this_page:1,
        pagesize:5,
        PaylogItems:null,
        hasMore:false,
        showLoading:false
    },
    //加载完成后 读取用户信息
    onLoad:function(){
        var that = this
        //获取用户信息
        _function.getUserInfo(wx.getStorageSync("utoken"),that.initGetUserInfoData,this)
        //获取用户购买
        _function.getUserPaylog(wx.getStorageSync("utoken"),that.data.this_page,that.data.pagesize,that.initGetUserPayInfoData,this)
    },
    initGetUserInfoData:function(data){
        var that = this
        if(data.code == 1){
            that.setData({
                userInfo:data.info
            })
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        wx.redirectTo({
                            url: 'index?_'+ Date.now()
                        })
                    })
                }
            })
        }
    },
    initGetUserPayInfoData:function(data){
        var that = this
        that.setData({
            PaylogItems:data.info
        })
        console.log(that.data.PaylogItems)
    },
    //下拉刷新
    onPullDownRefresh:function(){
        var that = this
        that.setData({
          this_page:1
        })
        _function.getUserInfo(wx.getStorageSync("utoken"),that.initGetUserInfoData,this)
        _function.getUserPaylog(wx.getStorageSync("utoken"),that.data.this_page,that.data.pagesize,that.initGetUserPayInfoData,this)
        setTimeout(()=>{
            wx.stopPullDownRefresh()
        },1000)
    },
    //滚动加载
    indexscrolltolower:function(){
      var that = this
      that.setData({
          hasMore:true
      })
      _function.getCmsList(wx.getStorageSync("utoken"),this.data.this_page + 1,that.data.pagesize,that.initGetUserPayInfoMoreData,this)
    },
    initGetUserPayInfoMoreData:function(data){
      var that = this
      if(data.info == null){
          that.setData({
            hasMore: false,
          })
        }else{
          that.setData({
            PaylogItems:that.data.PaylogItems.concat(data.info),
            this_page:that.data.this_page + 1
          })
        }
    }
})