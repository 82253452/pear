var util = require('../utils/util.js')
var config = require('../config/config.js')
function getBookList(call){
    var url = config.showApiBase
    var that = this
    var datas = []
    util.Mget(url+'/211-2',{
        keyword: '' ,
        typeId: '',
        page:'',
        showapi_sign:config.secret,
        showapi_appid:config.appid
      },function(data){
         var conentList
        try{
          conentList = data.showapi_res_body.pagebean.contentlist
        }
        catch(e){
          console.info('接口数据异常！')
        }
         var i=0
        for(var book in conentList){
            var auther = conentList[book].author
            var id = conentList[book].id
            var name = conentList[book].name
            var newChapter = conentList[book].newChapter
            var typeb = conentList[book].type
            var typebName = conentList[book].typeName
            var updateTime = conentList[book].updateTime 
            datas[i]={
              id:id,
              title:name,
              rec_description:newChapter,
              tags:typebName,
              tagId:typeb,
              "bg":"../assets/img/book-bg1.jpg",
              "large_cover":"/pages/assets/img/nocover.jpg",
              "hits":227317,
              "comment_count":465,
              "fav_count":3185
            }
            i=i+1
        }
     
       call(datas)
      },function(){
        console.info('失败处理')
      })
}
function getBookZj(id,fun){
    var url = config.showApiBase
    var that = this
    var datas = []
    util.Mget(url+'/211-1',{
      showapi_sign:config.secret,
      showapi_appid:config.appid,
      bookId:id
    },function(data){
      var chapterList = data.showapi_res_body.book.chapterList
      chapterList.sort(function(a,b){
            return a.cid-b.cid})
      fun(chapterList)
    })
}
function getBookContent(id,cid,fun){
    var url = config.showApiBase
    var that = this
    var datas = []
    util.Mget(url+'/211-4',{
      showapi_sign:config.secret,
      showapi_appid:config.appid,
      bookId:id,
      cid:cid
    },function(data){
      var content = data.showapi_res_body
      fun(content)
    })
}
function test(name){
  console.info('222')
  console.info(name)
}

module.exports = {
    getBookList: getBookList,
    getBookZj:getBookZj,
    getBookContent:getBookContent
}