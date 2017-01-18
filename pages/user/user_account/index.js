var app = getApp()
Page({
    data:{
        userInfo:{}
    },
    //加载完成后 读取用户信息
    onLoad:function(){
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
        })
    }
})