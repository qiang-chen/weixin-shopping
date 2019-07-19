// components/title/title.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titleList:Array,
    curId:String,
    curKey:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    change(e){
      //console.log(e)
      let id=e.currentTarget.dataset;
      this.triggerEvent("changeCurId",id)
      this.triggerEvent("changeCurKey",id)
    }
  }
})
