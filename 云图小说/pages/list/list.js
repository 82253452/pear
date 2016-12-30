var service = require('../../service/showApiService.js')
var app = getApp()
Page({
  data:{
    // text:"这是一个页面"
    datas:[],
    currSize:""
  },
  onLoad:function(options){
    var bookId = options.bookId
    var that = this
    service.getBookZj(bookId,function(data){
        that.setData({
          datas:data
        })
    })
    // 页面初始化 options为页面跳转所带来的参数
    // var datas = service.getBookList(function(datas){
    //   console.info('callBack')
    //   var index = options.pageIndex;
    //   var pageSize = 10;
    //   this.setData({currSize:((index - 1)*pageSize)});
    //   var endSize = this.data.currSize+pageSize;
    //   for(var i = this.data.currSize;i<endSize;i++){
    //     datas.push("第"+(i+1)+"章");
    //   }
    //   console.info(datas)
    //   this.setData({
    //     datas:datas
    //   })
    //   app.globalData.datas=this.datas
    // })
   
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
  },clickShowContent:function(event){
     wx.navigateTo({url:"../content/content?bookId="+event.target.dataset.bookid+"&cid="+event.target.dataset.cid});
  }
})