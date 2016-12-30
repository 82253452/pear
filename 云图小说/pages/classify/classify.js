var service = require('../../service/showApiService.js')
var app = getApp()
Page({
    data:{
        typeList:[
            {
                'id':'1',
                "name": "玄 幻 魔 法"
            },
            {
                "id": "2",
                "name": "武 侠 修 真"
            },
            {
                "id": "3",
                "name": "现 代 都 市"
            },
            {
                "id": "4",
                "name": "言 情 小 说"
            },
            {
                "id": "5",
                "name": "历 史 军 事"
            },
            {
                "id": "6",
                "name": "游 戏 竞 技"
            },
            {
                "id": "7",
                "name": "科 幻 灵 异"
            },
            {
                "id": "8",
                "name": "耽 美 小 说"
            },
            {
                "id": "9",
                "name": "同 人 小 说"
            },
            {
                "id": "10",
                "name": "其 他 类 型"
            }
        ]
    },
    onLoad:function(options){

    },
    onReady:function(){
        // 页面渲染完成
    },
    onShow:function(){
        // 页面显示
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    },getList:function (opt) {
        var id = opt.target.dataset.id;
        app.globalData.typeId=id
        app.globalData.page=0
        // wx.redirectTo({url:"../index/index?bookId=1"});
        wx.switchTab({
         url: '../index/index'
        })
    }
})