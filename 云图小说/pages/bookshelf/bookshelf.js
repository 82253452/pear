var app = getApp()
Page({
    data: {

    },
    onLoad: function (options) {
        try {
            var value = wx.getStorageSync('book')
            if (value) {
                for(var key in value){
                    console.info(value[key].title)
                }                
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
    }
})