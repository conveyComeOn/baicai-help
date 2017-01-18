var _function = require('../../../../utils/functionData.js');
var app = getApp()
Page({
    data:{
        userInfo:{},
        allAddress:[]
    },
    //加载完成后 读取用户信息
    onShow:function(){
        var that = this
        //获取用户收货地址
        _function.getUserAddressList(wx.getStorageSync("utoken"),that.initGetUserAddressListData,this)
    },
    initGetUserAddressListData:function(data){
        var that = this
        if(data.code == 1){
            that.setData({
                allAddress:data.info
            })
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        _function.getUserAddressList(wx.getStorageSync("utoken"),that.initGetUserAddressListData,this)
                    })
                }
            })
        }
    },
    //添加新地址
    addrss_bind:function(e){
        var aid = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../address_add/index?aid=' + aid
        })
    },
    //下拉刷新
    onPullDownRefresh:function(){
        _function.getUserInfo(wx.getStorageSync("utoken"),this.initGetUserInfoData,this)
        setTimeout(()=>{
            wx.stopPullDownRefresh()
        },1000)
    }
})