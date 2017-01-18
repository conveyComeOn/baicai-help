// mallcart.js
var _function = require('../../../utils/functionData');
var app = getApp()
Page({
    data:{
        cart_list:[],
        all_g_number:0,
        all_g_price:0,
        is_show_address:false,
        address_list:null,
        this_address_id:0,
        this_address_info:'请选择',
        btn_submit_disabled:false
    },
    onShow:function(options){
        var that = this
      //请求购物车信息
      _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,this)
    },
    initgetCartListData:function(data){
      var that = this
      if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        that.setData({
                            local_global_token:token
                        })
                        that.setData({
                            this_page:1,
                            buttonIsDisabled:false
                        })
                        _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,this)
                    })
                }
            })
            return false;
      }
      that.setData({
          cart_list:data.info.glist,
          all_g_number:data.info.all_g_number,
          all_g_price:data.info.all_g_price
      })
    },
    //提交订单
    order_formSubmit:function(e){
        var that = this
        that.setData({
            btn_submit_disabled:true
        })
        var order_info = e.detail.value
        _function.orderPost(wx.getStorageSync("utoken"),order_info,that.initorderPostData,this)
    },
    initorderPostData:function(data){
        var that = this
        that.setData({
            btn_submit_disabled:false
        })
        if(data.code == 1){
             //跳转支付
             var order_id = data.info
             wx.redirectTo({
                url: '../orderpay/index?order_id=' + order_id
             })
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        that.setData({
                            local_global_token:token
                        })
                        _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,this)
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
    //选择收货地址
    select_address_bind:function(){
        var that = this
        //加载用户收货地址
        _function.getAddressList(wx.getStorageSync("utoken"),that.initgetAddressListData,this)
    },
    initgetAddressListData:function(data){
        var that = this
        if(data.code == 1){
             that.setData({
                 address_list:data.info,
                 is_show_address:true
             })
             if(data.info != null){
                var datas = data.info
                var address_str = ''
                for(var i=0;i<datas.length;i++){
                    console.log(that.data.this_address_id)
                    if(datas[i].id ==that.data.this_address_id){
                        datas[i].is_check = 'active'
                        address_str += datas[i].consignee
                        address_str += datas[i].mobile
                    }else{
                        datas[i].is_check = ''
                    }
                }
                that.setData({
                    address_list:datas,
                    this_address_info:address_str
                })
             }
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        that.setData({
                            local_global_token:token
                        })
                        _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,this)
                    })
                }
            })
        }
    },
    //确认选择地址
    chose_address_bind:function(e){
        var that = this
        var aid = e.currentTarget.id
        that.setData({
            this_address_id : aid
        })
        var datas = that.data.address_list
        var address_str = ''
        for(var i=0;i<datas.length;i++){
            if(datas[i].id == aid){
                datas[i].is_check = 'active'
                address_str += datas[i].consignee
                address_str += datas[i].mobile
            }else{
                datas[i].is_check = ''
            }
        }
        that.setData({
            address_list:datas,
            this_address_info:address_str
        })
    },
    //关闭收货地址
    select_address_close_bind:function(){
        var that = this
        that.setData({
            is_show_address:false
        })
    },
    //添加收货地址
    index_item_bind:function(){
        wx.navigateTo({
            url: '../../user/shop/address_add/index'
        })
    }
})