// pages/bus/bus.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyList: [],
    sumNum:0,
    price:0,
    all:true,//用来确定多选框的选中状态
  },

  change(e) {
    //点击加加减减执行的函数
    //console.log(e)
    let {
      type,
      id
    } = e.currentTarget.dataset;
    let index = app.globalData.buyList.findIndex(item => item.spuId == id);
    //console.log(index, "id是", id)
    if (index != -1) {
      //console.log(app.globalData.buyList[index])
      if (type === "+") {
        app.globalData.buyList[index].num++;
      } else {
        app.globalData.buyList[index].num--;
        if (app.globalData.buyList[index].num <= 1) {
          app.globalData.buyList[index].num = 1;
        }
      }
      this.setData({
        buyList: app.globalData.buyList
      },()=>{
        this.calculate();
      })
    }
  },
  checkboxChange(e) {
    //在多选框切换状态的时候会触发这个函数
    //console.log(e);
    let id=e.currentTarget.dataset.id;
    let index = app.globalData.buyList.findIndex(item => item.spuId == id);
    if(!e.detail.value.length){
      //非选中状态
      app.globalData.buyList[index].checkedd=false
    }else{
      //选中状态
      app.globalData.buyList[index].checkedd=true
    }
    this.setData({
      buyList: app.globalData.buyList
    },()=>{
      let flag=this.data.buyList.every(item=>item.checkedd)
      this.setData({
        all:flag
      })
      this.calculate();
    })
  },
  checkAll(e){
    //console.log(e)
    this.setData({
      all:!this.data.all,
      buyList:this.data.buyList.map(item=>{
        item.checkedd=!this.data.all;
        return item
      })
    },()=>{
      app.globalData.buyList=this.data.buyList;
      this.calculate();
    })
  },
  calculate() {
    //计算价格和总数
    let sumNum = 0;
    let price = 0;
    this.data.buyList.forEach(item => {
      //console.log(item.checkedd)
      if (item.checkedd) {
        //console.log("进来了吗")
        sumNum += item.num;
        price += item.originPrice*item.num;
      }
    })
    this.setData({
      sumNum,
      price
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.buyList)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      buyList: app.globalData.buyList
    },()=>{
      this.calculate();
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})