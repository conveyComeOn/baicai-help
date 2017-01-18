var _function = require('../../../../utils/functionData.js');
import { SA } from '../../../../utils/selectarea/selectarea';
var app = getApp()
Page({
    data:{
        info:[],
        this_aid:0,
        submitIsLoading:false,
        buttonIsDisabled:false
    },
    onLoad: function (options) {
        var that = this
        var aid = options.aid
        SA.load(this, {
            showDistrict: true // 省市区三级（true，默认值）／省市两级（false）
        }); // 初始化区域框
        if(aid > 0){
            that.setData({
                this_aid:aid
            })
            //获取收货地址信息
            _function.getAddressInfo(wx.getStorageSync("utoken"),aid,that.initAddressInfoData,this)
        }
    },
    initAddressInfoData:function(data){
        console.log(data)
        var that = this
        if(data.code == 1){
            that.setData({
                info:data.info,
                address:data.info.province+' '+data.info.city+' '+data.info.district,
                selectedCode:data.info.district_code
            })
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        _function.getAddressInfo(wx.getStorageSync("utoken"),aid,initAddressInfoData,this)
                    })
                }
            })
        }else if(data.code == 5){
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false
            })
            return false;
        }
    },
    choosearea() { // 页面弹框触发事件
        console.log(this.data)
        SA.choosearea(this);
    },
    tapProvince(e) { // 点击省份
        SA.tapProvince(e, this);
    },
    tapCity(e) { // 点击城市
        SA.tapCity(e, this);
    },
    tapDistrict(e) { // 点击区域
        SA.tapDistrict(e, this);
    },
    cancel() { // 取消选择
        SA.cancel(this);
    },
    confirm(e) { // 确认选择区域
        SA.confirm(e, this);
    },
    //添加修改地址
    formSubmit:function(e){
        var that = this
        var address_info = e.detail.value
        that.setData({
            submitIsLoading:true,
            buttonIsDisabled:true
        })
        _function.addAddress(wx.getStorageSync("utoken"),address_info,that.initaddAddressData,this)
    },
    initaddAddressData:function(data){
        var that = this
        if(data.code == 1){
            wx.showModal({
            title: '提示',
            content: data.info,
            success: function(res) {
                if (res.confirm) {
                    wx.redirectTo({
                        url: '../address_list/index'
                    })
                }
            }
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
        }else if(data.code == 5){
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false
            })
        }
        that.setData({
            submitIsLoading:false,
            buttonIsDisabled:false
        })
    },
    deleteAddress:function(){
        var that = this
        _function.delAddress(wx.getStorageSync("utoken"),that.data.this_aid,that.initdelAddressData,this)
    },
    initdelAddressData:function(data){
        var that = this
        if(data.code == 1){
            wx.showModal({
            title: '提示',
            content: data.info,
            success: function(res) {
                if (res.confirm) {
                    wx.redirectTo({
                        url: '../address_list/index'
                    })
                }
            }
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
        }else if(data.code == 5){
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false
            })
            return false;
        }
    }
})