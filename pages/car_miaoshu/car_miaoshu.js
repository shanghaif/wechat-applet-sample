//获取应用实例
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noteMaxLen: 500,
    caseData:[],
  },
  
  /*生命周期--start *
        /**
         * 生命周期函数--监听页面加载
         */
  onLoad(options) {
    this.options = options
    this.init(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  },
  /**
   * 页面滚动时触发
   */
  onPageScroll() {
  },

  /*生命周期--end*/
  /*自定义方法--start */     
  /* 初始化 */
  init(options) {
    console.log('-init', options)
    if (this.options) {
      app.xcxPost({
        url: "/manager/owner/carDescribeInit.do",
        data: { id: this.options.ccd_id||"" },
        success: res => {
          let _data = res.data
          this.setData({
            caseData: _data || []
          })
          
        }
      })
    }
    this.setData({
      concent: this.options.describe||""
    })
  },
  textA(e) {
    console.log('e', e)
    this.setData({
      concent: e.detail.value,
    })
  },
  conf(){
    if (!this.data.concent) {
      app.warningMsg({ title: "请输入车辆描述" })
      return
    }
    app.xcxPost({
      url: "/manager/owner/carDescribe.do",
      data: { id: this.options.car_id, car_describe: this.data.concent},
      success: res => {
        app.successMsg({ title: res.errmsg || "" + "" })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000);
      }
    })
  }
})