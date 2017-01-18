//post.js
var _function = require('../../../utils/functionData');
var app = getApp()
Page({
    data:{
        userInfo:{},
        img_count_limit:3,
        this_img_i:0,
        this_img_max:0,
        this_post_id:0,
        postimg:[],
        submitIsLoading:false,
        buttonIsDisabled:false,
        cate_index:0,
        cateList:[],
        forumlist_isshow:false,
        forum_thisname:'版 块',
        forum_thisid:0,
        array:["商品信息","灌水杂谈"],
       typeArray:["二手","求购","出租","转让","赠送","租房","交换"],
       typearr:["灌水","提个醒","问个事","社区快讯","搭把手","寻失物","找宠物"],
        first_index:0,
        this_nav_name:0
    },
    //取消操作
    post_cancel_bind:function(){
        wx.navigateBack()
    },
    initBbsCateData:function(data){
      var that = this;

      that.setData({
          cateList:data.info
      })
    },firstpickchange:function(e){
        console.log(e.detail.value)
        this.setData({
            first_index:e.detail.value
        })
    },
    bindPickerChange:function(e){
        this.setData({
            cate_index:e.detail.value
        })
    },
    //删除
    del_pic_bind:function(e){
        var that = this
        var index = e.currentTarget.id;
        var datas = that.data.postimg;
        datas.splice(index,1)
        that.setData({
            postimg:datas
        })
    },
    //上传图片
    chooseimg_bind:function(){
        var that = this
        var img_lenth = that.data.postimg.length
        var sheng_count = that.data.img_count_limit - img_lenth
        if(sheng_count <= 0){
            wx.showModal({
                title: '提示',
                content: '对不起，最多可上传三张图片',
                showCancel:false
            })
            return false
        }
        wx.chooseImage({
            count: sheng_count,
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    postimg:that.data.postimg.concat(res.tempFilePaths)
                })
            }
        })
    },
    //发表帖子
    formSubmit:function(e){
       console.log(e.detail.value);
        var that = this
        var t_data = e.detail.value
        var content="#"+t_data.pid+"#"+t_data.post_title;
        t_data.post_title=content;

   if(that.data.first_index==0){
 var t_wb_name = that.data.cateList[that.data.cateList.length-1]
   }else{
 var t_wb_name = that.data.cateList[that.data.cate_index]
   }

        that.setData({
            buttonIsDisabled:true,
            submitIsLoading:true
        })
        _function.postBBs(wx.getStorageSync("utoken"),t_data,t_wb_name,that.initPostBBSData,this)
    },
    initPostBBSData:function(data){
        var that = this
        that.setData({
            buttonIsDisabled:false,
            submitIsLoading:false
        })
        if(data.code == 1){
            var post_id = data.info
            //如果发表成功，则进行上传图片接口
            var g_data = that.data.postimg
            
            if(g_data.length > 0){
                that.setData({
                    this_img_max:g_data.length,
                    this_post_id:post_id
                })
                wx.showToast({
                    title: '图片上传中',
                    icon: 'loading',
                    duration: 10000
                })
                that.imgUploadTime()
            }
           
           wx.navigateBack({
             delta: 1, // 回退前 delta(默认为1) 页面
             success: function(res){
               // success
             },
             fail: function() {
               // fail
             },
             complete: function() {
               // complete
             }
           })




        }else if(data.code == 5){
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false
            })
            return false
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        wx.redirectTo({
                            url: 'post?_'+ Date.now()
                        })
                    })
                }
            })
        }
    },
    imgUploadTime:function(pid){
        var that = this
        var this_img_len = that.data.this_img_i
        var this_img_max_len = that.data.this_img_max
        if(this_img_len < this_img_max_len){
            _function.imgUpload(that.data.this_post_id,wx.getStorageSync("utoken"),that.data.postimg[this_img_len],that.initImgUploadData)
        }else{
            wx.hideToast()
        }
        
    },
    initImgUploadData(data){
        var that = this
        that.setData({
            this_img_i:that.data.this_img_i + 1
        })
        that.imgUploadTime()
    },
    onShow:function(){
        var that = this
        //请求板块列表
       _function.getBbsTwoCategory(that.initBbsCateData,this)
        //获取用户信息
        _function.getUserInfo(wx.getStorageSync("utoken"),that.initGetUserInfoData,this)
    },
    initGetUserInfoData:function(data){
        var that = this
        if(data.code == 1){
            that.setData({
                userInfo:data.info
            })
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        wx.redirectTo({
                            url: 'post?_'+ Date.now()
                        })
                    })
                }
            })
        }
    },index_nav_bind:function(e){
            var that=this;
      


      for(var i=0;i<this.data.typeArray.length;i++){
          if(e.target.id==this.data.typeArray[i]){
                 that.setData({
            this_nav_name:i
            })
          }
       }
    //     if(e.target.id=="二手"){
    //           that.setData({
    //         this_nav_name:0
    //         })
    //     }else if(e.target.id=="求购"){

    //         that.setData({
    //             this_nav_name:1
    //         })
    //     }else if(e.target.id=="出租"){
    //          that.setData({
    //             this_nav_name:2
    //         })
    //     }
    },
    index_na_bind:function(e){
             var that=this;
      for(var i=0;i<this.data.typearr.length;i++){
          if(e.target.id==this.data.typearr[i]){
                 that.setData({
            this_nav_name:i
            })
          }
       }
    }
})