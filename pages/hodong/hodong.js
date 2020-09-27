
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
     
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  goGet:function(){
    wx.navigateTo({
      url: '../bahe/bahe',
    })
  },
   goSet:function(){
    wx.navigateTo({
      url: '../ball/ball',
    })
  }
})