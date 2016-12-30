var app = getApp()
Page({
    data: {
        books: []
    },
    onLoad: function (options) {

    },
    getBook: function (e) {
        var that = this
        var index = e.target.dataset.index
        var book = this.data.books[index]
        var bookId = book['id']
        if (book['prevConetentId']) {
            wx.navigateTo({url: "../content/content?bookId=" + bookId + "&cid=" + book['prevConetentId']});
        } else {
            wx.navigateTo({url: "../list/list?bookId=" + bookId})
        }
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        var that = this
        try {
            var value = wx.getStorageSync('book')
            // this.data.books = value
            var books = []
            if (value) {
                for (var key in value) {
                    // console.info(value[key].title)
                    value[key]['id'] = key
                    books.push(value[key])
                }
                that.setData({
                    books: books
                })
                console.info(books)
            }
        } catch (e) {
            // Do something when catch error
        }
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})