//mall.js
var _function = require('../../../utils/functionData');
var app = getApp()
Page({
  data:{
    cate_list:[],
    this_item:0,
    this_cate_id:0,
    goods_list:[],
    hasMore:false,
    showLoading:false,
    isScrollY:true,
    this_page:1,//当前页码
    pagesize:10,//每页数量
    this_finish_page:0,
    glo_is_load:true
  },
  detail: function(e) {
    wx.navigateTo({
      url: '../malldetail/malldetail?sid='+ e.currentTarget.id
    })
  },
  mallcart: function(){
    wx.navigateTo({
      url: '../mallcart/mallcart'
    })
  },
  onLoad:function(){
      var that = this
      //商品列表
      _function.getGoodsList(0,1,that.data.pagesize,that.initGoodsListData,this)
      //商品分类
      _function.getShopCategory(that.initShopCateData,this)
  },onShareAppMessage: function () {   
    var shareTitle="夺冠魔方小程序生成平台";
    var shareDesc="欢迎使用夺冠魔方，在这里在可以快速生成您的小程序！";
    if(_function.duoguanData.duoguan_share_info.duoguanshop){
      shareTitle=_function.duoguanData.duoguan_share_info.duoguanshop.share_title;
      shareDesc=_function.duoguanData.duoguan_share_info.duoguanshop.share_desc;
    }    
    return {
      title: shareTitle,
      desc: shareDesc,
      path: '/pages/shop/mall/mall'
     }
    },
  initShopCateData:function(data){
    var that = this
      that.setData({
          cate_list:data.info,
          glo_is_load:false
      })
  },
  initGoodsListData:function(data){
    var that = this
    that.setData({
      goods_list:data.info
    })
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
  //选项卡操作
  index_item_bind:function(e){
    //获取分类id 然后动态加载所属分类商品
    var that = this
    var this_target = e.target.id;
    that.setData({
        this_item:this_target,
        this_page:1
      })
    _function.getGoodsList(this_target,1,that.data.pagesize,that.initGoodsListData,this)
  },
  //下拉刷新
    onPullDownRefresh:function(){
      var that = this
      that.setData({
        this_page:1,
        this_item:0
      })
      _function.getGoodsList(that.data.this_cate_id,that.data.this_page,that.data.pagesize,that.initGoodsListData,this)
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
    //滚动加载
    indexscrolltolower:function(){
      var that = this
      var this_target = this.data.this_item
      if(that.data.this_finish_page != that.data.this_page){
          _function.getGoodsList(that.data.this_cate_id,that.data.this_page + 1,that.data.pagesize,that.initGoodsListLoadData,this)
      }
    },
    initGoodsListLoadData:function(data){
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
              goods_list:that.data.goods_list.concat(data.info),
              this_page:that.data.this_page + 1
            })
        }
        that.setData({
          this_finish_page:that.this_finish_page + 1
        })
    },
    onReachBottom:function(e){
      var that = this
      var this_target = this.data.this_item
      if(that.data.this_finish_page != that.data.this_page){
          _function.getGoodsList(this_target,that.data.this_page + 1,that.data.pagesize,that.initGoodsListLoadData,this)
      }
    }
})