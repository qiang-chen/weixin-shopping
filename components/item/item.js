// components/item/item.js
//获取应用实例
//app.js
//Page Object
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product: Array,
    curId: String,
    curKey:String
  },
  /**
   * 组件的初始数据
   */
  data: {
    arr: [], //用来储存页面所有的高度 用来滑动右边让左边变色使用
  },
  ready() {
    let selQuery = this.createSelectorQuery();
    let arr = []
    selQuery.selectAll(".item").boundingClientRect(reac => {
      //console.log(reac);
      reac.forEach(item => {
        //console.log(item.top);
        arr.push(item.top);
      })
    }).exec()
    this.setData({
      arr
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击按钮触发的函数
    addBuy(e) {
      //console.log(e.currentTarget.dataset)
      let index = app.globalData.buyList.findIndex(item => item.spuId === e.currentTarget.dataset.item.spuId);
      if (index === -1) {
        app.globalData.buyList.push(e.currentTarget.dataset.item)
      } else {
        app.globalData.buyList[index].num++;
      }

      //console.log(index,"---",app.globalData.buyList)
    },
    scrollEvent(e) {
      //console.log(e)
      let {
        scrollTop
      } = e.detail;
      //console.log(scrollTop,this.data.arr)
      this.data.arr.forEach((item, index) => {
        if ((scrollTop+this.data.arr[0]) >= item&& scrollTop < this.data.arr[index + 1]) {
          //调用父组件的函数改变curId
          let id = this.data.product[index].id;
          //console.log(id, "==============")
          this.triggerEvent("changeCurKey", {
            id
          })
        }
      });

    }
  }
})