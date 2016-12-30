var util = require('../utils/util.js')
var config = require('../config/config.js')
function getBookList(keyword, typeId, page, call) {
    var url = config.showApiBase
    var that = this
    var datas = []
    util.Mget(url + '/getBookList', {
        keyword: keyword,
        typeId: typeId,
        page: page
    }, function (data) {
        var conentList
        try {
            conentList = data.showapi_res_body.pagebean.contentlist
        }
        catch (e) {
            console.info('接口数据异常！')
        }
        var i = 0
        for (var book in conentList) {
            var auther = conentList[book].author
            var id = conentList[book].id
            var name = conentList[book].name
            var newChapter = conentList[book].newChapter
            var typeb = conentList[book].type
            var typeName = conentList[book].author
            var updateTime = conentList[book].updateTime
            datas[i] = {
                id: id,
                title: name,
                rec_description: newChapter,
                tags: typeName,
                tagId: typeb,
                "bg": "../assets/img/book-bg1.jpg",
                "large_cover": "/pages/assets/img/nocover.jpg",
                "hits": 0,
                "comment_count": 0,
                "fav_count": 0
            }
            i = i + 1
        }

        call(datas)
    }, function () {
        console.info('失败处理')
    })
}
function getBookZj(id, fun) {
    var url = config.showApiBase
    var that = this
    var datas = []
    util.Mget(url + '/getBookCat', {
        bookId: id
    }, function (data) {
        console.info(data)
        var chapterList = data.showapi_res_body.book.chapterList
        chapterList.sort(function (a, b) {
            return a.cid - b.cid
        })
        util.addStorageChapList(data.showapi_res_body.book)
        fun(chapterList)
    })
}
function getBookContent(id, cid, fun) {
    var url = config.showApiBase
    var that = this
    var datas = []
    util.Mget(url + '/getBookConetent', {
        bookId: id,
        cid: cid
    }, function (data) {
        console.info(data)
        var content = data.showapi_res_body
        util.addStorageContent(content)
        fun(content)
    })
}
function test(name) {
    console.info('222')
    console.info(name)
}

module.exports = {
    getBookList: getBookList,
    getBookZj: getBookZj,
    getBookContent: getBookContent
}