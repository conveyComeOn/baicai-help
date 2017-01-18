var _function = require('../../../utils/functionData');
var app = getApp()
//选项卡
Page({
  data: {
      cateList:[],
      choose:0
    },
    //显示隐藏
    isShow_bind:function(e){
      var that = this
      var datas = that.data.cateList
      for(var i=0;i<datas.length;i++){
          if(datas[i].id == e.currentTarget.id){
              var isShow = (datas[i].isshow == true)?false:true;
              datas[i].isshow = isShow
          }
      }
      that.setData({
          cateList:datas,
         
      })
    },
    onLoad:function(e){
 this.setData({
         choose:e.id
      })
    },
    onShow:function(e){

      var that = this
     
      //请求板块列表
      _function.getBbsCategory(that.initBbsCateData,this)
      //  that.setData({
      //    choose:e.id
      // })
    },
    initBbsCateData:function(data){
      var that = this

      var array=[];
      for(var i=0;i<data.info.length-1;i++){
        array.push(data.info[i]);
      }
    
      that.setData({
          cateList:array,
      })
    },
    //跳转板块
    forumlist_bind:function(e){
   

if(this.data.choose){

// app.globalData.myhome=e.currentTarget.dataset.name;

console.log(e.currentTarget.id);
wx.setStorageSync('myhome',e.currentTarget.dataset.name);
wx.setStorageSync('homeid',e.currentTarget.id)


wx.navigateBack({
  delta: 1, // 回退前 delta(默认为1) 页面
  success: function(res){
    // success
  }
})
}else{
   wx.redirectTo({
        url: '../forumlist/forumlist?wid='+e.currentTarget.id+'&cname='+e.currentTarget.dataset.name
      })
}

   
    },
    //下拉刷新
    onPullDownRefresh:function(){
      var that = this
      _function.getBbsCategory(that.initBbsCateData,this)
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
})