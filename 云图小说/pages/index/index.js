var bookService = require('../../service/showApiService.js')
var util = require('../../utils/util.js')
Page({
  data:{
    // text:"这是一个页面"
    datas:[]
  },
  onLoad:function(options){
    var that  = this
    console.info(options)
     bookService.getBookList(function(data){
        that.setData({
          datas:data
        })
     })
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
  },clickShowList:function(event){
    console.log(event.target.id);
    wx.navigateTo({url:"../list/list?bookId="+event.target.id});
  }
})