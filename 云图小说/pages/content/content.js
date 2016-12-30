var service = require('../../service/showApiService.js')
var WxParse = require('../../wxParse/wxParse.js')
var util = require('../../utils/util.js')
Page({
    data: {
        // text:"这是一个页面"
        cid: "",
        cname: '',
        id: '',
        contents: ""
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        var bookId = options.bookId
        var cid = options.cid
        service.getBookContent(bookId, cid, function (data) {
            var content = data.cname + '<br/><br/>' + data.txt
            that.setData({
                cid: data.cid,
                cname: data.cname,
                id: data.bookId,
                contents: content
            })
            WxParse.wxParse('content', 'html', content, that, 5);
        })
    },
    loadNext: function (e) {
        var that = this;
        var bookId = this.data.id
        var cid = parseInt(this.data.cid)
        try {
            var books = wx.getStorageSync('book')
            if (books) {
                var book = books[bookId]
                var chapList = book['chapList']
                chapList.sort(function (a, b) {
                    return a.cid - b.cid
                })
                var newCid = cid
                var len = chapList.length
                for (var i = 0; i < len; i++) {
                    if (cid == chapList[i].cid) {
                        newCid = chapList[i + 1].cid
                        break
                    }
                }
                service.getBookContent(bookId, newCid, function (data) {
                    var contents = that.data.contents + '<br/><br/>' + data.cname + '<br/><br/>' + data.txt
                    that.setData({
                        cid: data.cid,
                        cname: data.cname,
                        id: data.bookId,
                        contents: contents
                    })
                    WxParse.wxParse('content', 'html', contents, that, 5);
                })

            }
        } catch (e) {
            // Do something when catch error
        }

    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
        try {
            var books = wx.getStorageSync('books')
            if (books) {
                // Do something with return value
                var bookIid = this.data.id
                var cid = this.data.cid
                var cname = this.data.cname
                books[id]['prevConetentId']=cid
                books[id]['prevConetentName']=cname
                try {
                    wx.setStorageSync('book', books)
                } catch (e) {
                }

            }
        } catch (e) {
            // Do something when catch error
        }
    }
})