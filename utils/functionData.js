var _DuoguanData = require('data.js');
module.exports = {
    //通用url请求
    requestUrl:function(data,url,callback,pageobj){
        wx.request({
            url: url,
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
               
                if (res.statusCode == 200 && res.data.code > 0) {


              console.log(res);
                    callback.apply(pageobj,[res.data])
                } else {
                    var error_msg = 'error:接口请求错误';
                    if(res.data.info != 'null' || res.data.info != ''){
                        error_msg = res.data.info;
                    }
                    wx.showModal({
                    title: '提示',
                        content: error_msg,
                        showCancel:false
                    })
                }
        



            },
            complete:function(){
                
            }
        });
    },
    getname:function(info){
        var typearray=[];
      var yang=[];
      var all=[];
      if(info){
      for(var i=0;i<info.length;i++){

      var title=info[i].title;
      var number=title.indexOf('#',1);

     
     var typetxt=title.substring(0,number+1);
     var yangtxt=title.substring(number+1,title.length);

    
       typearray.push(typetxt);
       yang.push(yangtxt);
      

      
     }
 
       all.push(typearray);
       all.push(yang);
      }
     
          return all;
    },
    //请求轮播图接口
    getSwiperList: function(callback,pageobj){
        var that = this;
        var data = {
            token: _DuoguanData.duoguan_user_token,
            _: Date.now()
        };
        var res = this.requestUrl(data,_DuoguanData.duoguan_swiper_url,callback,pageobj)
    },
    //请求内容分类接口
    getCmsCateList:function(beginnum,endnum,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            beginnum:beginnum,
            endnum:endnum,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_cms_cate_url,callback,pageobj)
    },
    //请求内容接口
    getCmsList:function(s_key,cate_id,pagesize,pagenum,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            cate_id:cate_id,
            keyword:s_key,
            pagesize:pagesize,
            pagenum:pagenum,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_cms_url,callback,pageobj)
    },
    //请求内容详情
    getCmsInfo:function(utoken,id,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            id:id,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_cms_read_url,callback,pageobj)
    },
    //提交评论接口
    postComment:function(utoken,cid,content,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            cid:cid,
            content:content,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_comment_add_url,callback,pageobj)
    },
    //请求评论列表接品
    getCommentList:function(cid,pagesize,pagenum,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            cid:cid,
            pagesize:pagesize,
            pagenum:pagenum,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_comment_list_url,callback,pageobj)
    },
    //留言点赞
    postCommentGood:function(cid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            cid:cid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_comment_good_url,callback,pageobj)
    },
    //获取会员信息
    getUserInfo:function(utoken,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_user_info_url,callback,pageobj)
    },
    //编辑会员信息
    postUserInfo:function(utoken,udata,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            udata:udata,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_user_info_post_url,callback,pageobj)
    },
    //获取收货地址
    getUserAddressList:function(utoken,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_user_address_list_url,callback,pageobj)
    },
    //添加收货地址
    addAddress:function(utoken,ainfo,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            ainfo:ainfo,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_user_address_add_url,callback,pageobj)
    },
    //编辑收货地址
    getAddressInfo:function(utoken,aid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            aid:aid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_user_address_info_url,callback,pageobj)
    },
    //删除收货地址
    delAddress:function(utoken,aid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            aid:aid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_user_address_del_url,callback,pageobj)
    },
    //获取购买记录
    getUserPaylog:function(utoken,pagesize,pagenum,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            pagesize:pagesize,
            pagenum:pagenum,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_user_paylog_url,callback,pageobj)
    },
    //支付信息签名生成
    makePayData:function(utoken,cid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            cid:cid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_make_paydata_url,callback,pageobj)
    },
    //获取用户帖子
    getUserPostList:function(utoken,pagesize,pagenum,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            pagesize:pagesize,
            pagenum:pagenum,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_user_postlist_url,callback,pageobj)
    },
    //获取用户订单
    getUserOrderList:function(utoken,pagesize,pagenum,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            pagesize:pagesize,
            pagenum:pagenum,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_user_orderlist_url,callback,pageobj)
    },
    //用户删除订单
    deleteOrderInfo:function(utoken,oid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            oid:oid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_delete_user_order_url,callback,pageobj)
    },
    //用户确认收货
    shouhuoOrderInfo:function(utoken,oid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            oid:oid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_shouhuo_user_order_url,callback,pageobj)
    },
    //用户商品评论
    postCommentOrder:function(utoken,oid,fval,fcon,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            oid:oid,
            fval:fval,
            fcon:fcon,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_post_comment_order,callback,pageobj)
    },
    //读取社区板块
    getBbsCategory:function(callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_bbs_cate_url,callback,pageobj)
    },
    //获取公告板块
    getBbsGonggaoId:function(callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_bbs_gonggao_id,callback,pageobj)
    },
    //读取社区二级板块
    getBbsTwoCategory:function(callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_bbs_cate_two_url,callback,pageobj)
    },
    //读取帖子列表

    //151 0 1 10
    getBbsPostList:function(wid,isjinghua,pagesize,pagenum,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            wid:wid,
            isjinghua:isjinghua,
            pagesize:pagesize,
            pagenum:pagenum,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_bbs_postlist_url,callback,pageobj)
    },
    //发表帖子
    postBBs:function(utoken,t_data,t_wb_name,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            t_data:t_data,
            t_wb_name:t_wb_name,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_bbs_post_url,callback,pageobj)
    },
    //上传帖子图片接口
    imgUpload:function(pid,utoken,imgurl,cb){
        wx.uploadFile({
            url: _DuoguanData.duoguan_imgupload_url,
            filePath: imgurl,
            name: 'file',
            formData:{
                token: _DuoguanData.duoguan_user_token,
                utoken:utoken,
                pid: pid
            },
            success: function(res){
                cb(res.data);
            }
        })
    },
    //获取帖子详情
    getPostInfo:function(pid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            pid:pid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_post_info_url,callback,pageobj)
    },
    //验证是否为管理员
    checkBBSManage:function(utoken,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_check_bbs_manage_url,callback,pageobj)
    },
    //删除帖子
    delPostAction:function(utoken,pid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            pid:pid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_post_del_url,callback,pageobj) 
    },
    //添加评论
    addPostReply:function(utoken,pid,rp_id,content,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            pid:pid,
            rp_id:rp_id,
            content:content,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_post_replyadd_url,callback,pageobj)
    },
    //评论列表
    getReplyList:function(pid,pagesize,pagenum,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            pid:pid,
            pagesize:pagesize,
            pagenum:pagenum,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_post_replylist_url,callback,pageobj) 
    },
    //喜欢点赞
    postXihuanAct:function(utoken,pid,ptype,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            pid:pid,
            ptype:ptype,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_post_xihuan_url,callback,pageobj) 
    },
    //举报
    postReportAct:function(utoken,pid,ptype,content,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            pid:pid,
            ptype:ptype,
            content:content,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_post_report_url,callback,pageobj) 
    },
    //读取商城配置
    getShopConfig:function(callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_shop_config_url,callback,pageobj)
    },
    //读取商品分类
    getShopCategory:function(callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_shop_cate_url,callback,pageobj)
    },
    //读取商品列表
    getGoodsList:function(cid,pagesize,pagenum,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            cid:cid,
            pagesize:pagesize,
            pagenum:pagenum,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_good_list_url,callback,pageobj)
    },
    //获取商品详情
    getGoodsInfo:function(sid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            sid:sid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_good_info_url,callback,pageobj)
    },
    //添加购物车
    addGoodsCart:function(utoken,gid,gnumber,gattr,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            gid:gid,
            gnumber:gnumber,
            gattr:gattr,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_add_good_cart_url,callback,pageobj)
    },
    //获取购物车信息
    getCartList:function(utoken,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_cart_list_url,callback,pageobj)
    },
    //删除购物车
    delCartList:function(utoken,cid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            cid:cid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_del_cart_list_url,callback,pageobj)
    },
    //更新购物车
    editCartList:function(utoken,cid,cnum,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            cid:cid,
            cnum:cnum,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_edit_cart_list_url,callback,pageobj)
    },
    //提交订单
    orderPost:function(utoken,oinfo,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            oinfo:oinfo,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_order_post_url,callback,pageobj)
    },
    //获取订单详情
    getOrderInfo:function(utoken,oid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            oid:oid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_order_info_url,callback,pageobj)
    },
    //商品支付信息签名生成
    makeOrderPayData:function(utoken,oid,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            oid:oid,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_make_order_pay_url,callback,pageobj)
    },
    //获取收货地址
    getAddressList:function(utoken,callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            utoken:utoken,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_address_list_url,callback,pageobj)
    },
    //获取会员中心菜单
    getUserMenu:function(callback,pageobj){
        var data = {
            token: _DuoguanData.duoguan_user_token,
            _: Date.now()
        };
        this.requestUrl(data,_DuoguanData.duoguan_get_user_menu_url,callback,pageobj)
    },duoguanData:_DuoguanData,
}