var _function = require('../../../../utils/functionData.js');
var app = getApp()
Page({
    data:{
        postlist:[],
        gonggaolist:[],
        this_weiba_id:0,
        hasMore:false,
        showLoading:false,
        isScrollY:true,
        this_page:1,//当前页码
        pagesize:10,//每页数量
        this_nav_name:'index',
        this_is_jinghua:0,
        this_finish_page:0,
        glo_is_load:true,
        newtype:[],
        yang:[]
    },
    onLoad:function(){
      var that = this
      _function.getUserPostList(wx.getStorageSync("utoken"),that.data.this_page,that.data.pagesize,that.initUserPostListData,this)
    },
    initUserPostListData:function(data){
      var that = this
      that.setData({
          postlist:data.info,
          glo_is_load:false
      })

   var typearray=[];
      var yang=[];
      if(data.info){
      for(var i=0;i<data.info.length;i++){

      var title=data.info[i].title;
      var number=title.indexOf('#',1);

     
     var typetxt=title.substring(0,number+1);
     var yangtxt=title.substring(number+1,title.length);


    
       typearray.push(typetxt);
       yang.push(yangtxt);

       that.setData({
         newtype:typearray,
         yang:yang
       })
     }

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
      _function.getUserPostList(wx.getStorageSync("utoken"),that.data.this_page,that.data.pagesize,that.initUserPostListData,this)
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
    //滚动加载
    indexscrolltolower:function(){
      var that = this
      var this_target = this.data.this_items
      if(that.data.this_finish_page != that.data.this_page){
          _function.getUserPostList(wx.getStorageSync("utoken"),that.data.this_page + 1,that.data.pagesize,that.initUserPostListLoadData,this)
      }
    },
    initUserPostListLoadData:function(data){
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
          _function.getUserPostList(wx.getStorageSync("utoken"),that.data.this_page + 1,that.data.pagesize,that.initUserPostListLoadData,this)
      }
    },
    bbs_info_bind:function(e){
        wx.navigateTo({
            url: '../../../bbs/detail/detail?pid='+ e.currentTarget.id
        })
    }
})














