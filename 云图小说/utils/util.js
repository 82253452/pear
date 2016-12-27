function Mget (url,data,fun,err){
  wx.request({
      url: url, 
      data: data,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        fun(res.data)
      },fail:function(e){
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
var util = {
  formatTime: formatTime,
  Mget :Mget
}
module.exports = util
