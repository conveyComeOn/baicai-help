//news_view.js
var _function = require('../../../utils/functionData.js');
var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp()

var pageObject = {
    data:{
        news_data:{},//新闻详情
        wxParseData:'',
        disabled: false,
        submitIsLoading:false,
        buttonIsDisabled:false,
        comment_con:'',
        this_cms_id:0,
        //评论列表
        message_items:[],
        local_global_token:'',
        userInfo:[],
        show_write_message:false,
        glo_is_load:true
    },
    //支付提交
    bind_pay:function(){
        var that = this
        that.setData({
            disabled: true
        })
        _function.makePayData(wx.getStorageSync("utoken"),that.data.this_cms_id,that.initMakePayData,this)
    },
    initMakePayData:function(data){
        var that = this
        wx.requestPayment({
            'timeStamp': data.info.timeStamp,
            'nonceStr': data.info.nonceStr,
            'package': data.info.package,
            'signType': 'MD5',
            'paySign': data.info.paySign,
            'success':function(res){
                console.log(res)
            },
            'fail':function(res){
                
            },
            'complete':function(){
                that.setData({
                    disabled: false
                })
                _function.getCmsInfo(wx.getStorageSync("utoken"),that.data.this_cms_id,that.initCmsInfoData,that)
                _function.getCommentList(that.data.this_cms_id,1,5,that.initCommentListData,that)
            }
        })
    },
    //显示留言框
    write_message_bind:function(){
        var that = this
        var is_show_message = that.data.show_write_message
        if(is_show_message){
            that.setData({
                show_write_message: false
            })
        }else{
            that.setData({
                show_write_message: true
            })
        }
        
    },
    //留言提交
    formSubmit: function(e) {
        var that = this
        var t_con = e.detail.value.text_con
        that.setData({
          submitIsLoading:true,
          buttonIsDisabled:true
        })
        if(t_con == ''){
            wx.showModal({
                title: '提示',
                content: '对不起，请输入留言内容',
                showCancel:false
            })
            that.setData({
                submitIsLoading:false,
                buttonIsDisabled:false
            })
            return false;
        }
        _function.postComment(wx.getStorageSync("utoken"),that.data.this_cms_id,t_con,that.initCommentAddData,this) 
    },
    initCommentAddData:function(data){
        var that = this
        if(data.code == 1){
            wx.showToast({
                title: '留言提交成功',
                icon: 'success',
                duration: 2000
            })
            that.setData({
                submitIsLoading:false,
                buttonIsDisabled:false,
                show_write_message:false
            })
            _function.getCommentList(that.data.this_cms_id,1,5,that.initCommentListData,this)
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
                        //获取用户信息
                        _function.getUserInfo(wx.getStorageSync("utoken"),that.initGetUserInfoData,this)
                        _function.getCmsInfo(wx.getStorageSync("utoken"),that.data.this_cms_id,that.initCmsInfoData,this)
                        _function.getCommentList(that.data.this_cms_id,1,5,that.initCommentListData,this) 
                    })
                }
            })
        }else{
            that.setData({
                submitIsLoading:false,
                buttonIsDisabled:false
            })
        }
    },
    onLoad:function(options){
        var that = this
        var duoguan_cms_id = options.cms_id;
        that.setData({
          this_cms_id:duoguan_cms_id,
        })
        //获取用户信息
        _function.getUserInfo(wx.getStorageSync("utoken"),that.initGetUserInfoData,this)
        _function.getCmsInfo(wx.getStorageSync("utoken"),duoguan_cms_id,that.initCmsInfoData,this)
        _function.getCommentList(duoguan_cms_id,1,5,that.initCommentListData,this) 
    },
    initCmsInfoData:function(data){
        var that = this
        that.setData({
          news_data:data.info,
          //wxParseData:WxParse('html',data.info.content)
        })
        WxParse.wxParse('article', 'html', data.info.content, that,0)
    },
    initCommentListData:function(data){
        this.setData({
          message_items:data.info,
          glo_is_load:false
        })
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
                        //获取用户信息
                        _function.getUserInfo(wx.getStorageSync("utoken"),that.initGetUserInfoData,this)
                        _function.getCmsInfo(wx.getStorageSync("utoken"),that.data.this_cms_id,that.initCmsInfoData,this)
                        _function.getCommentList(that.data.this_cms_id,1,5,that.initCommentListData,this) 
                    })
                }
            })
        }
    },
    //留言点赞
    commentGoodBind:function(e){
        var cid = e.target.id;
        _function.postCommentGood(cid,this.initCommentGoodData,this)
    },
    initCommentGoodData:function(rdata){
        _function.getCommentList(this.data.this_cms_id,1,5,this.initCommentListData,this)
    },
    //下拉刷新
    onPullDownRefresh:function(){
        var that = this
        that.setData({
            submitIsLoading:false,
            buttonIsDisabled:false
        })
        _function.getCmsInfo(wx.getStorageSync("utoken"),this.data.this_cms_id,this.initCmsInfoData,this)
        _function.getCommentList(this.data.this_cms_id,1,5,this.initCommentListData,this)
        setTimeout(()=>{
            wx.stopPullDownRefresh()
        },1000)
    },
    set_close:function(){
        var that = this
        that.setData({
            show_write_message:false
        })
    }
    
}
Page(pageObject)