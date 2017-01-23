var _function = require('../../../utils/functionData.js');
var app = getApp()
Page({
    data:{
        userInfo:{},
        bbs_show_status:true,
        shop_show_status:true,
        menu_list:'',
        glo_is_load:true,
        home:"",
        myhome:""
    },
    //用户充值
    bind_user_charge:function(){
        wx.navigateTo({
            url: '../user_account/index'
        })
    },
    //编辑资料
    bind_user_edit:function(){
        wx.navigateTo({
            url: '../user_edit/index'
        })
    },
    bind_user_paylog:function(){
        wx.navigateTo({
            url: '../user_pay/index'
        })
    },
    //收货地址
    bind_user_address:function(){
        wx.navigateTo({
            url: '../shop/address_list/index'
        })
    },
    //我的帖子
    bind_user_bbspost:function(){
        wx.navigateTo({
            url: '../bbs/list/index'
        })
    },
    choose_home:function(){
        
        var choose=1;
          wx.navigateTo({
      url: `../../bbs/find/forum?id=${choose}`
    })

    },
    //我的订单
    bind_user_order:function(){
        wx.navigateTo({
            url: '../order/list/index'
        })
    },
    tapUserInfo:function(){
        wx.navigateTo({
            url: 'user_info/user_info'
        })
    },
    //切换
    bbs_tab_change_bind:function(){
        var that = this
        that.setData({
            bbs_show_status:that.data.bbs_show_status?false:true
        }) 
    },
    shop_tab_change_bind:function(){
        var that = this
        that.setData({
            shop_show_status:that.data.shop_show_status?false:true
        }) 
    },
    //显示隐藏
    isShow_bind:function(e){
      var that = this
      var datas = that.data.menu_list
      for(var i=0;i<datas.length;i++){
          if(datas[i].name == e.currentTarget.id){
              var isShow = (datas[i].isshow == true)?false:true;
              datas[i].isshow = isShow
          }
      }
      that.setData({
          menu_list:datas,
      })
    },
    menu_link_bind:function(e){
        var link_url = e.currentTarget.id
        console.log(link_url)
        wx.navigateTo({
            url: '/' + link_url
        })
    },
    //加载完成后 读取用户信息
    onLoad:function(){
        var that = this
        //读取菜单配置
        _function.getUserMenu(that.initgetUserMenuData,this)
        //获取用户信息
        _function.getUserInfo(wx.getStorageSync("utoken"),that.initGetUserInfoData,this)
    },onShow:function(){
        var homename=wx.getStorageSync('myhome');
      this.setData({
          myhome:homename
      })
    },
    initgetUserMenuData:function(data){
        var that = this
        that.setData({
            menu_list:data.info
        })
    },
    initGetUserInfoData:function(data){
        var that = this
        if(data.code == 1){
            console.log(data);
            that.setData({
                userInfo:data.info,
                glo_is_load:false
            })
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        _function.getUserInfo(wx.getStorageSync("utoken"),that.initGetUserInfoData,that)
                    })
                }
            })
        }
    },
    //下拉刷新
    onPullDownRefresh:function(){
        var that = this
        //读取菜单配置
        _function.getUserMenu(that.initgetUserMenuData,this)
        _function.getUserInfo(wx.getStorageSync("utoken"),this.initGetUserInfoData,this)
        setTimeout(()=>{
            wx.stopPullDownRefresh()
        },1000)
    }
})