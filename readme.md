# readme

## 组件的开发

- 编写HTML即组件的template,先把结构写出来
- 把组件提取出来
- 加数据，考虑数据怎么加
- 为了增加组件的复用性，考虑内容分发
- 加事件改变数据等等

## 父子间通信

### 父组件传给子组件用prop/或者自定义传值

- 即把父组件里的data传给子组件

- 在写好的子组件上写v-bind:[prop名]=“父组件里的data名”

  ```html
  <my-list :user-data="userData"></my-list>
  ```

- ```js
  props: {
            userData: {
              type: Array,
              dafault: function () {
                return [];
              },
            },
          },
  ```

  

### 子组件传给父组件

- **不应该在子组件内改变prop**
- 要么把prop作为子组件内作为一个本地data返回
- 要么在computed里返回

## 非父子间通信

### 用空实例发送自定义事件

- ```js
  let busVM = new Vue();
  //然后在数据发送的组件上定义一个方法
   <li @touchend="showTel(user.tel)" v-for="user in item.users">{{user.name}}</li>
   //把数据user.tel作为参数传进去
  
  //方法里利用空实例的$emit，把数据发出去
   showTel: function (tel) {
       //加一个开关，在bMove为true时点击就会变成false,标志结束滑动状态，开始点击状态
       //开关打开，展示号码
              if (!this.bMove) {
                busVM.$emit("changeEvents", tel);
               
              } else {
                this.bMove = false;
              }
            }
  
  //
  ```

### 用Vuex管理状态

- 新建一个vuex 

  ```js
  Vue.use(Vuex);
  const store=new Vuex.Store({
      state:{
          //放数据，相当于data
          count:0
      },
      mutations:{
          //放改变数据的方法，相当于methods,但是必须传参的[state]
          increment(state){
              state.count++;
          }
      }
  })
  //通过store.state获取状态对象
  //通过store.commit(xx方法)触发状态变更
  ```

  

## 解决点击/滑动事件的冲突

- 需求梳理：点击通讯录，相应的会弹出电话的弹窗。但是，滑动时也会误触发

- 解决方法

  - 事件不用`touchstart`而用`touchend`，因为`touchend`会在滑动后触发

  - 在ul上面加一个bMove的开关，判断是否在滑动

  - ```html
     <ul class="list_user" ref='listUser' @touchmove="bMove=true"><!--look!-->
              <li v-for="item in userData">
                <p>{{item.index}}</p>
                <ul>
                    <!--look!-->
                  <li @touchend="showTel(user.tel)" v-for="user in item.users">{{user.name}}</li>
                </ul>
              </li>
             </ul>
             <ul class="list_index">
               <li @touchstart="setScroll" v-for="item in userIndex" >{{item}}</li>
             </ul>
           </div>
     ```
  
  
  ```
  
    ```js
    //在data里有一个bMove
    data: function () {
              return {
                bMove: false,
              };
    //真正滑动时就变成true
  ```

## 索引

- 基本思想：设置每个索引到top的距离为零，就要获取每个P元素

- 在索引标签上编写`setScroll`方法

- ```html
  <li @touchstart="setScroll" v-for="item in userIndex" >{{item}}</li>
  ```

- 在<ul>添加ref属性,以便操作DOM结构

- ```html
  <ul class="list_user" ref='listUser' @touchmove="bMove=true">
  ```

  把点击的内容与P标签（即所有的索引内容）遍历对比，找到对应的设置高度

  ```js
  setScroll: function (ev) {
             let aP=document.$refs.listUser.getElementsByTagName('p');
              for (let i = 0; i < aP.length; i++) {
                if (aP[i].innerHTML == ev.target.innerHTML) {
                  document.documentElement.scrollTop = aP[i].offsetTop;
                    //为了兼容有些是document.body
                }
              }
            }
  ```

  

## JS组件模式

- 弹窗点击时出现，非常适合**动态创建**

- 步骤

  - 封装一个类`let myAlert=(function(){})()`

    - 这个类里有什么？？——他是要接收参数，创建组件的

    1. 默认参数

    2. 组件的模板 【一个JS对象】

    3. 把**模板**用`Vue.extend()`生成一个vue构造器

    4. 一个接收参数的**回调**来创建组件

       - 回调里接收参数把默认参数换掉

       - 动态创建vue构造器实例（已经包含模板），把data用参数赋值

       - 最后在HTML页面添加 `document.body.appendChild(vue实例的对应元素)`

         即要用**$el**找到对应元素！

       ```js
       let myAlert = (function () {
               let defaults = {
                 //默认参数
                 title: "弹窗",
                 body: "",
                 cancelBtn: null,
                 confirmBtn: null,
               };
               let alertCom = {
                 //模板
                 template: `<div id="alert" >
               <div class="alert_content">
                 <div class="alert_title">{{customTitle}}</div>
                 <div class="alert_body">{{customBody}}</div>
                 <div class="alert_btn">
       			//方法即回调
                 <button v-if="comfirmBtn" @click="comfirmBtn">呼叫</button>
                 <button v-if="cancelBtn" @click="cancelBtn">取消</button>
               </div>
               </div>
             </div>`,
               };
       
               //形成一个Vue构造器——继承
               let myComponent = Vue.extend(alertCom);
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
       ```

       

  - 在需要创建组件时，调用该函数即可

  - ```js
    showTel: function (tel) {
                //加一个开关，在bMove为true时点击就会变成false,开关打开，展示号码
                if (!this.bMove) {
                  myAlert({
                      //传参
                    title: "呼叫",
                    body: tel,
                    cancelBtn: function () {
                        //方法
                      alert(2);
                      document.body.removeChild(document.getElementById('alert'));
                    },
                    confirmBtn: function () {
                        //方法
                      alert(1);
                    },
                  });
                } else {
                  this.bMove = false;
                }
              },
    ```

    

## vue单文件形式

1. 下载vue脚手架`npm i -g vue-cli`

2. 创建vue项目 `vue init webpack-simple my project`

3. ```
   cd my project
   npm i
   npm run dev
   ```

4. 在`src`目录下写改写代码

![image-20210201161329389](C:\Users\11027\AppData\Roaming\Typora\typora-user-images\image-20210201161329389.png)

5. 在src中的App.vue里，是Html的结构

   1.非JS组件，只建立一个.vue文件

   ```html
   <template>
   // 这里面是模板
   </template>
   
   <script>
   // 在组件里需要用其他组件的话，要引进来
   import <组件名> from './'
   export default{
       name:<组件名>,
       data() {
           return {
               //数据
           }
       },
       props:{
           
       },
       computed:{
           
       },
       methods:{
           
       }
   }
   </script>
   
   <style>
   //样式资源
   </style>
   ```

   2.JS组件需要建立两个文件 .vue和.js

   ```html
   // .vue
   <template>
   // 这里面是模板
   </template>
   
   <script>
   
   export default{
      //里面啥也没有
   }
   </script>
   
   <style>
   //样式资源
   </style>
   ```

   ```js
   // .js
   import Vue from 'vue'
   import <模板名> from './对应的vue文件'
   
   // 以下内容和js组件文件相同
   //但是因为模板在.vue文件里已经定义了，所以在vue.extend时用引进来的模板名
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
   
   // !important
   export default <js封装的类名>
   ```

6.最后在App.vue文件里的`template`里写最后的页面组合

```html
<template>
  <div id="app">
    <my-header custom-title="通讯录"
               custom-fixed>
      <template #left><button @touchstart="backBtn">返回</button></template><!--具名插槽-->
      <template #right><button @touchstart="homeBtn">主页</button></template>
    </my-header>
    <my-list :user-data="userData"></my-list>
  </div>
</template>

<script>
let userData = [
  {
    index: 'A',
    users: [
      { name: 'a1', tel: '15082678867' },
      { name: 'a2', tel: '15082678867' },
      { name: 'a3', tel: '15082678867' },
      { name: 'a4', tel: '15082678867' },
    ],
  },
	 ......
]
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      userData: userData,
    }
  },
  methods: {
    backBtn: function () {
      alert('123')
    },
    homeBtn: function () {
      alert('456')
    },
  },
}
</script>

<style>
// 样式资源
</style>
```

7.最后在`main.js`文件里引用所有的组件

```js
import Vue from 'vue'
import App from './App.vue'
import Header from './header.vue'
import List from './list.vue'

// Header.name就是组件名，Header就是所有的配置啦

Vue.component(Header.name,Header)
Vue.component(List.name,List)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

8.在`index.html`里

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>myvue</title>
    <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no" />
  </head>
  <body>
      <!--最后app这个div就会被替换-->
    <div id="app"></div>
    <script src="/dist/build.js"></script>
  </body>
</html>
```

