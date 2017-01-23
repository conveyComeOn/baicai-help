//index.js
var _function = require('../../../utils/functionData');
var app = getApp()
Page({
  data: {
      postlist:[],
      gonggaolist:[],
      this_weiba_id:0,
      this_gonggao_id:0,
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
      yang:[],
      my:0,
      hehe:0

    },
  //事件处理函数
  forumPage: function() {
    wx.navigateTo({
      url: '../forum/forum'
    })
  },
  post: function() {
    wx.navigateTo({
      url: '../post/post'
    })
  },
  detail: function(e) {
    wx.navigateTo({
      url: '../detail/detail?pid='+ e.currentTarget.id
    })
  },
  //切换
  index_nav_bind:function(e){
    var that = this
    var this_name = e.target.id
    that.setData({
      this_nav_name:e.target.id,
      this_page:1,
      this_is_jinghua:0,
      this_weiba_id:0
    })
    if(this_name == 'index'){
        that.setData({
          this_weiba_id:0,
        
        })
    }else if(this_name == 'gonggao'){
      var homeid=wx.getStorageSync('homeid');
     
if(homeid){
that.setData({
          this_weiba_id:homeid,
           hehe:1
        })
}else{
  that.setData({
          this_weiba_id:10,
          
        })
        var id=1;
  wx.showModal({
                    title: '提示',
                        content: '您尚未设置你的小区,现在要去设置我的小区吗',
                        showCancel:true,
                        success:function(res){
                            if (res.confirm) {
       wx.navigateTo({
                            url: `../find/forum?id=${id}`,
                            success: function(res){
                              that.setData({
        
            hehe:1
        })
                            },
                            fail: function() {
                              // fail
                            },
                            complete: function() {
                              // complete
                            }
                          })
    }
                        
                        }
                       
         })



}

        
    }else if(this_name == 'jinghua'){
        that.setData({
          this_weiba_id:158
      //    this_is_jinghua:1
        })
    }

   
    _function.getBbsPostList(that.data.this_weiba_id,that.data.this_is_jinghua,that.data.this_page,that.data.pagesize,that.initBbsPostListData,this)
  },
  onLoad:function(options){
    console.log(options);
  
      var that = this
      //请求帖子列表
      var wid = options.wid;
      if(wid != undefined){
          that.setData({
            this_weiba_id:wid,
          })
      }
      that.setData({
        this_page:1
      })
      _function.getBbsPostList(that.data.this_weiba_id,that.data.this_is_jinghua,that.data.this_page,that.data.pagesize,that.initBbsPostListData,that)
      //获取公告ID
   //   _function.getBbsGonggaoId(that.initgetBbsGonggaoIdData,that)
    },onShow:function(){
      var that=this;
    
     
 
       that.onPullDownRefresh();
    
    }
    ,onShareAppMessage: function () {   
    var shareTitle="小白菜帮";
    var shareDesc="立足于社区服务的小程序！";
    // if(_function.duoguanData.duoguan_share_info.weiba){
    //   shareTitle=_function.duoguanData.duoguan_share_info.weiba.share_title;
    //   shareDesc=_function.duoguanData.duoguan_share_info.weiba.share_desc;
    // }    
    return {
      title: shareTitle,
      desc: shareDesc,
      path: '/pages/bbs/index/index'
     }
    },
    initgetBbsGonggaoIdData:function(data){
      var that = this
      that.setData({
          this_gonggao_id:data.info
      })
    },
    initBbsPostListData:function(data){
      var that = this;

      var datalength=Object.keys(data);
     
      //    console.log(datalength);
      if( data.info==null){
         that.setData({
        my:true
        
      })

      }else{
             that.setData({
        my:false
        
      })
      }
      that.setData({
          postlist:data.info,
          glo_is_load:false
      })



      
     
      var typearray=[];
      var yang=[];
      if(data.info){
        var all=_function.getname(data.info);
        
        typearray=all[0];
        yang=all[1];
      that.setData({
         newtype:typearray,
         yang:yang
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
    initGonggaoPostListData:function(data){
      var that = this
      that.setData({
          gonggaolist:data.info
      })
    },
    //下拉刷新
    onPullDownRefresh:function(e){
      var that = this
//       console.log(e);
//       if(that.data.this_nav_name=='gonggao'){
// var homeid=wx.getStorageSync('homeid');

 
//     console.log(homeid,that.data.this_weiba_id)
// if(homeid!=that.data.this_weiba_id){
// that.setData({
//           this_weiba_id:homeid,
        
//         })
// }else{
//   that.setData({
//           this_weiba_id:0
//         })
    
// }
//       }


//  console.log(that.data.this_nav_name,that.data.hehe);
 if(that.data.this_nav_name=='gonggao'&&homeid!=that.data.this_weiba_id){
         

 var homeid=wx.getStorageSync('homeid');
 
    // console.log(homeid,that.data.this_weiba_id)

that.setData({
          this_weiba_id:homeid,
          hehe:1
        
        })
}else{
  that.setData({
          this_weiba_id:0,
          hehe:0
        })
    


    
      }






      
      that.setData({
        this_page:1
      })
      _function.getBbsPostList(that.data.this_weiba_id,that.data.this_is_jinghua,that.data.this_page,that.data.pagesize,that.initBbsPostListData,this)
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
    //滚动加载
    indexscrolltolower:function(){
      var that = this
      var this_target = this.data.this_items
      if(that.data.this_finish_page != that.data.this_page){
          _function.getBbsPostList(that.data.this_weiba_id,that.data.this_is_jinghua,that.data.this_page + 1,that.data.pagesize,that.initBbsPostListLoadData,this)
      }
    },
    initBbsPostListLoadData:function(data){
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





     
      var typearray=[];
      var yang=[];
      if(data.info){
        var all=_function.getname(that.data.postlist);
        
        typearray=all[0];
        yang=all[1];
      that.setData({
         newtype:typearray,
         yang:yang
       })

      }







        }
        that.setData({
          this_finish_page:that.this_finish_page + 1
        })
    },
    onReachBottom:function(e){
      var that = this
      var this_target = this.data.this_weiba_id
      if(that.data.this_finish_page != that.data.this_page){
          _function.getBbsPostList(that.data.this_weiba_id,that.data.this_is_jinghua,that.data.this_page + 1,that.data.pagesize,that.initBbsPostListLoadData,this)
      }
    }
})

