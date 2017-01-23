//index.js
var _function = require('../../utils/functionData');
var app = getApp();
//选项卡
var items = [];
Page({
  data: {
      commonApiUrl:{},
      DuoguanSwiperData:[],
      DuoguanSwiperConfig:[],
      DuoguanCmsCateItems : [],
      DuoguanCmsMoreCateItems : [],
      //默认选项卡
      this_items:0,
      //新闻列表
      DuoguanCmsItems:[],
      this_page:1,
      pagesize:10,
      hasMore:false,
      showLoading:false,
      showsidenav:false,
      is_scroll_y:true,
      glo_is_load:true
    },
    //搜索操作
    search:function(e){
      var that = this;
      var s_key = e.detail.value;
      _function.getCmsList(s_key,0,that.data.this_page,that.data.pagesize,that.initCmsData,this);
    },
    onLoad:function(){
      var that = this;
      //请求轮播图接口
      _function.getSwiperList(that.initSwiperData,this);
      //请求内容分类列表
      _function.getCmsCateList(0,100,that.initCmsCateData,this);
      //请求内容分类列表
      _function.getCmsCateList(4,100,that.initCmsMoreCateData,this);
      //请求内容列表
      _function.getCmsList(0,0,that.data.this_page,that.data.pagesize,that.initCmsData,this);
    },
    onShareAppMessage: function () {   
    var shareTitle="小白菜帮";
    var shareDesc="大家自己的社区";
    if(_function.duoguanData.duoguan_share_info.duoguancms){
      shareTitle=_function.duoguanData.duoguan_share_info.duoguancms.share_title;
      shareDesc=_function.duoguanData.duoguan_share_info.duoguancms.share_desc;
    }    
    return {
      title: shareTitle,
      desc: shareDesc,
      path: '/pages/index/index'
     }
    },
    initSwiperData:function(data){
      var that = this;
      that.setData({
          DuoguanSwiperData:data.info.data_list,
          DuoguanSwiperConfig:data.info.data_config
        })
    },
    initCmsCateData:function(data){
      var that = this;
      that.setData({
          DuoguanCmsCateItems:data.info,
        })
    },
    initCmsMoreCateData:function(data){
      var that = this;
      that.setData({
          DuoguanCmsMoreCateItems:data.info,
        })
    },
    initCmsData:function(data){
      var that = this;
      if(data.info == null){
          that.setData({
              is_scroll_y:false,
              showLoading:false
          })
      }else{
        if(data.info.length >= that.data.pagesize){
            that.setData({
                is_scroll_y:true,
                showLoading:true
            })
        }else{
            that.setData({
                is_scroll_y:false,
                showLoading:false
            })
        }
      }
      that.setData({
          DuoguanCmsItems:data.info,
          glo_is_load:false
        })
    },
    //选项卡操作
    index_item_bind:function(e){
      //获取分类id 然后动态加载所属分类新闻
      var that = this;
      var this_target = e.target.id;
      that.setData({
          this_items:this_target,
          this_page:1,
          showsidenav:false
        });
      _function.getCmsList(0,this_target,1,that.data.pagesize,that.initCmsData,this)
    },
    index_item_more_bind:function(){
      var this_show = this.data.showsidenav;
      if(this_show == true){
          this.setData({
            showsidenav:false
          })
      }else{
          this.setData({
            showsidenav:true
          })
      }
    },
    //下拉刷新
    onPullDownRefresh:function(){
      var that = this;
      that.setData({
          this_items:0,
          this_page:1
        });
        //请求轮播图接口
      _function.getSwiperList(that.initSwiperData,this);
      //请求内容分类列表
      _function.getCmsCateList(0,100,that.initCmsCateData,this);
      //请求内容列表
      _function.getCmsList(0,0,that.data.this_page,that.data.pagesize,that.initCmsData,this);
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
    //滚动加载
    indexscrolltolower:function(){
      var that = this;
      that.setData({
          hasMore:true
      });
      var this_target = this.data.this_items;
      _function.getCmsList(0,this_target,this.data.this_page + 1,that.data.pagesize,that.initCmsLoadData,this);
    },
    initCmsLoadData:function(data){
      var that = this;
        if(data.info == null){
          that.setData({
              is_scroll_y:false,
              showLoading:false,
              hasMore: false,
          })
        }else{
            if(data.info.length >= that.data.pagesize){
                that.setData({
                    is_scroll_y:true,
                    showLoading:true
                })
            }else{
                that.setData({
                    is_scroll_y:false,
                    showLoading:false,
                    hasMore: false,
                })
            }
            that.setData({
              DuoguanCmsItems:that.data.DuoguanCmsItems.concat(data.info),
              this_page:that.data.this_page + 1
            });
        }
    },
    onReachBottom:function(e){
      var that = this;
      that.setData({
          hasMore:true
      });
      var this_target = this.data.this_items;
      _function.getCmsList(0,this_target,this.data.this_page + 1,that.data.pagesize,that.initCmsLoadData,this)
    }
})
