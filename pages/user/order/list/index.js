var _function = require('../../../../utils/functionData.js');
var app = getApp()
Page({
    data:{
        postlist:[],
        this_weiba_id:0,
        hasMore:false,
        showLoading:false,
        isScrollY:true,
        this_page:1,//当前页码
        pagesize:10,//每页数量
        this_nav_name:'index',
        this_is_jinghua:0,
        this_finish_page:0,
        glo_is_load:true
    },
    //订单详情
    user_orderinfo_bind:function(e){
        var oid = e.currentTarget.id;
        wx.navigateTo({
            url: '../info/index?oid=' + oid
        })
    },
    //删除订单
    delete_user_order:function(e){
        var that = this
        var oid = e.currentTarget.id;
        wx.showModal({
            title: '提示',
            content: "确认要删除该订单吗?",
            success:function(res){
                if(res.confirm == true){
                    _function.deleteOrderInfo(wx.getStorageSync("utoken"),oid,that.initdeleteOrderInfoData,that)
                }
            }
        })
    },
    initdeleteOrderInfoData:function(data){
        var that = this
        if(data.code == 1){
            that.setData({
                this_page:1
            })
            _function.getUserOrderList(wx.getStorageSync("utoken"),that.data.this_page,that.data.pagesize,that.initUserOrderListData,that)
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                _function.getUserOrderList(wx.getStorageSync("utoken"),that.data.this_page,that.data.pagesize,that.initUserOrderListData,that)
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
    onShow:function(){
      var that = this
      that.setData({
          this_page:1
      })
      _function.getUserOrderList(wx.getStorageSync("utoken"),that.data.this_page,that.data.pagesize,that.initUserOrderListData,this)
    },
    initUserOrderListData:function(data){
      var that = this
        if(data.code == 1){
            that.setData({
                postlist:data.info,
                glo_is_load:false
            })
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                _function.getUserOrderList(wx.getStorageSync("utoken"),that.data.this_page,that.data.pagesize,that.initUserOrderListData,this)
                    })
                }
            })
        }
      
      if(data.info == null){
          that.setData({
              isScrollY:false,
              showLoading:false
          })
      }else{
        if(data.info.length >= that.data.pagesize){
            that.setData({
                isScrollY:true,
                showLoading:true
            })
        }else{
            that.setData({
                isScrollY:false,
                showLoading:false
            })
        }
      }
    },
    //下拉刷新
    onPullDownRefresh:function(){
      var that = this
      that.setData({
        this_page:1
      })
      _function.getUserOrderList(wx.getStorageSync("utoken"),that.data.this_page,that.data.pagesize,that.initUserOrderListData,this)
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
    //滚动加载
    indexscrolltolower:function(){
      var that = this
      var this_target = this.data.this_items
      if(that.data.this_finish_page != that.data.this_page){
          _function.getUserOrderList(wx.getStorageSync("utoken"),that.data.this_page + 1,that.data.pagesize,that.initUserOrderListLoadData,this)
      }
    },
    initUserOrderListLoadData:function(data){
      var that = this
      if(data.info == null){
          that.setData({
              isScrollY:false,
              showLoading:false
          })
        }else{
            if(data.info.length >= that.data.pagesize){
                that.setData({
                    isScrollY:true,
                    showLoading:true
                })
            }else{
                that.setData({
                    isScrollY:false,
                    showLoading:false
                })
            }
            that.setData({
              postlist:that.data.postlist.concat(data.info),
              this_page:that.data.this_page + 1
            })
        }
        that.setData({
          this_finish_page:that.this_finish_page + 1
        })
    },
    onReachBottom:function(e){
      var that = this
      var this_target = this.data.this_items
      if(that.data.this_finish_page != that.data.this_page){
          _function.getUserOrderList(wx.getStorageSync("utoken"),that.data.this_page + 1,that.data.pagesize,that.initUserOrderListLoadData,this)
      }
    }
})