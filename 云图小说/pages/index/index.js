var bookService = require('../../service/showApiService.js')
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    // text:"这是一个页面"
    datas: []
  },
  onLoad: function (options) {

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.loadBook()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  clickShowList: function (event) {
    util.addStorageBook(this.data.datas[event.target.dataset.index])
    wx.navigateTo({ url: "../list/list?bookId=" + event.target.id })
  },
  loadBook: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    var that = this
    var typeId = app.globalData.typeId
    var keyword = app.globalData.keyword
    var page = app.globalData.page
    app.globalData.page = page + 1
    bookService.getBookList(keyword, typeId, page, function (data) {
      var datas = that.data.datas.concat(data)
      that.setData({
        datas: datas
      })
      wx.hideToast()
    })
  },
  test: function (e) {
    console.info("test");
  },
  loadMor: function (e) {
    this.loadBook()
  }
})