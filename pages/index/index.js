//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    shopName: "",
    shopPic: "",
    SumProductList: [],
    titleList: [], //用来存放左边的标题列表
    product: [],//右边商品列表
    curId:"a100",//当前id用来改变右边颜色 和连接左边的scroll-view让其进行滚动滑动
    curKey:"a100"
  },
  onLoad: function () {
    //发送请求获取商品
    var reqTask = wx.request({
      url: 'http://localhost:8888/shop/list',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        if (result.data.code === 200) {
          console.log(result.data.data);

          let arr = [];
          result.data.data.categoryList.forEach(item => {
            let opj = {};
            opj.id = item.tag;
            item.spuList.forEach(el=>{
              el.num=1;
              el.checkedd=true
            })
            opj.title=item.categoryName;
            opj.spuList = item.spuList;
            arr.push(opj);
          })


          this.setData({
            shopName: result.data.data.shopName,
            shopPic: result.data.data.shopPic,
            SumProductList: result.data.data.categoryList,
            titleList: result.data.data.categoryList.map(item => {
              delete item.spuList;
              return item
            }),
            product: arr
          })
        }

      },
      fail: () => {},
      complete: () => {}
    });
  },
  changeCurId(e){
    //console.log(e);
    let {id}=e.detail;
    //console.log(id,"sm")
    //console.log(id);
    this.setData({
      curId:"a"+id
    })
  },
  changeCurKey(e){
    let {id}=e.detail;
    this.setData({
      curKey:"a"+id
    })
  }
})