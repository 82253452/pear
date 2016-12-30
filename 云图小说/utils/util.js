function Mget(url, data, fun, err) {
    wx.request({
        url: url,
        data: data,
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            fun(res.data)
        }, fail: function (e) {
            console.info(url + '接口调用异常')
            err()
        }
    })
}
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
function addStorageBook(book) {
    console.info(book)
    var bookStore = wx.getStorage({
        key: 'book',
        success: function (res) {
            var data = res.data
            console.info('init')
            console.info(data)
            if (!!data[book.id]) {
                console.info('更新Look+1')
                data[book.id]['look'] = data[book.id]['look'] + 1
            } else {
                console.info('新book' + book.id)
                data[book.id] = {
                    title: book.title,
                    prevConetentId: '',
                    look: 0,
                    chapList: [],
                    newChapter: '',
                    prevConetentName: ''
                }
            }
            console.info(22)
            console.info(data)
            var dataS = Object.keys(data).sort(function (a, b) {
                if (data[a]['look'] - data[b]['look'] >= 0) {
                    return -1
                }
                return 1

            });
            var ren = {}
            var i = 0
            console.info(dataS + 'datas')
            for (var key in dataS) {
                console.info('key:' + dataS[key])
                ren[dataS[key]] = data[dataS[key]]
                i++
                if (i == 20) {
                    break
                }
            }
            console.info(ren)
            wx.setStorage({
                key: "book",
                data: ren
            })
        }
    })
}
function addStorageChapList(book) {
    var chapterList = book['chapterList']
    var newChapter = book['newChapter']
    var id = book['id']
    wx.getStorage({
        key: 'book',
        success: function (res) {
            var book = res.data
            if (!!id && !!book[id]) {
                book[id]['chapList'] = chapterList
                book[id]['newChapter'] = newChapter
                wx.setStorage({
                    key: "book",
                    data: book
                })
            }
        }
    });
}
function addStorageContent(book) {
    console.info('addStorageContent')
    var cid = book.cid
    var id = book.bookId
    var cname = book.cname
    wx.getStorage({
        key: 'book',
        success: function (res) {
            var book = res.data
            if (!!id && !!book[id]) {
                book[id]['prevConetentId'] = cid
                book[id]['prevConetentName'] = cname
                console.info(book)
                wx.setStorage({
                    key: "book",
                    data: book
                })
            }
        }
    });
}
var util = {
    formatTime: formatTime,
    Mget: Mget,
    addStorageBook: addStorageBook,
    addStorageChapList: addStorageChapList,
    addStorageContent: addStorageContent
}
module.exports = util
