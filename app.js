//app.js
var _DuoguanData = require('./utils/data.js');
App({
  onLaunch: function () {
    var local_utoken = wx.getStorageSync("utoken");
    this.setLog(_DuoguanData.duoguan_user_token,local_utoken);
  },
  setLog:function(token,utoken){
    var that=this;
     wx.request({
       url: _DuoguanData.duoguan_Launch_log_url,
       data: {token:token,utoken:utoken},
       method: 'POST', 
       success: function(res){
         if(res.data.success==-1){
            that.getNewToken(function(u){
                 that.setLog(_DuoguanData.duoguan_user_token,u);
            })
         }else{
       
         }
       },
       complete: function() {
         // complete
       }
     })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
       var utoken=wx.getStorageSync("utoken");
       wx.login({
            success: function (res) {
              var code=res.code;
              wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = res.userInfo;
                  wx.request({
                    url: _DuoguanData.duoguan_auth_login_url,
                    method:"POST",
                    data: {
                       utoken:utoken,
                       code: code,
                       token:_DuoguanData.duoguan_user_token,
                       encryptedData:res.encryptedData,
                       iv:res.iv
                    },
                    fail:function(res){
                      console.dir(res);
                    },
                    success: function(res) {
                      var utoken=res.data.utoken;
                      wx.setStorageSync("utoken",utoken);
                      that.globalData.utoken=utoken;
                      that.globalData.userInfo.utoken=utoken;
                      typeof cb == "function" && cb(that.globalData.userInfo)
                    }
                  })
                }
              })
            }
      })
    }
  },
  getNewToken:function(cb){
    var that = this
    var utoken=wx.getStorageSync("utoken");
      wx.login({
        success: function (res) {
          var code=res.code;
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              wx.request({
                url: _DuoguanData.duoguan_auth_login_url,
                method:"POST",
                data: {
                    utoken:utoken,
                    code: code,
                    token:_DuoguanData.duoguan_user_token,
                    encryptedData:res.encryptedData,
                    iv:res.iv
                },
                fail:function(res){
                  console.dir(res);
                },
                success: function(res) {
                  var utoken=res.data.utoken;
                  wx.setStorageSync("utoken",utoken);
                  that.globalData.utoken=utoken;
                  that.globalData.userInfo.utoken=utoken;
                  typeof cb == "function" && cb(utoken)
                }
              })
            }
          })
        }
    })
  },
  globalData:{
    userInfo:'',
    utoken:'',
    myhome:""
  }
})