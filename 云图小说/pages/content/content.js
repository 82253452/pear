var service = require('../../service/showApiService.js')
var WxParse = require('../../wxParse/wxParse.js')
Page({
  data:{
    // text:"这是一个页面"
    cid:"",
    cname:'',
    id:'',
    content : ""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var bookId = options.bookId
    var cid = options.cid
    console.info(bookId)
    service.getBookContent(bookId,cid,function(data){    
      that.setData({
        cid:data.cid,
        cname:data.cname,
        id:data.bookId
      })
      WxParse.wxParse('content', 'html', data.txt, that,5);
    })
  },
  loadNext:function(e){
    var that = this;
    var bookId = this.data.id
    var cid = parseInt(this.data.cid)+1  
    service.getBookContent(bookId,cid,function(data){
          console.info(data)
      that.setData({
        cid:data.cid,
        cname:data.cname,
        id:data.bookId
      })
      WxParse.wxParse('content', 'html', data.txt, that,5);
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
  }
})