import Vue from 'vue'
import Alert from './alert.vue'
let myAlert = (function () {
  let defaults = {
    //默认参数
    title: "弹窗",
    body: "",
    cancelBtn: null,
    confirmBtn: null,
  };

  //形成一个Vue构造器——继承
  let myComponent = Vue.extend(Alert);
  return function (opts) {
    //获得参数
    for (attr in opts) {
      defaults[attr] = opts[attr];
    }
    //动态创建
    var vm = new myComponent({
      el: document.createElement("div"), //template会替代这个el
      data: {
        customTitle: defaults["title"],
        customBody: defaults["body"],
        cancelBtn: defaults["cancelBtn"],
        comfirmBtn: defaults["confirmBtn"],
      },
    });
    //$el找到这个vue实例对应的元素
    document.body.appendChild(vm.$el);
  };
})();
export default myAlert