# readme

- ## 组件的开发

  - 编写HTML即组件的template,先把结构写出来
  - 把组件提取出来
  - 加数据，考虑数据怎么加
  - 为了增加组件的复用性，考虑内容分发
  - 加事件改变数据等等

- ## 父子间通信

  - ### 父组件传给子组件用prop/或者自定义传值

    - 即把父组件里的data传给子组件
    - 在写好的子组件上写v-bind:[prop名]=“父组件里的data名”
    - ![image-20210118213620979](C:\Users\11027\AppData\Roaming\Typora\typora-user-images\image-20210118213620979.png)
    - ![image-20210118213655878](C:\Users\11027\AppData\Roaming\Typora\typora-user-images\image-20210118213655878.png)

  - ### 子组件传给父组件

    - **不应该在子组件内改变prop**
    - 要么把prop作为子组件内作为一个本地data返回
    - 要么在computed里返回

- ## 非父子间通信

  - ### 用空实例发送自定义事件

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

  - ### 用Vuex管理状态

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

      

- ## 解决点击/滑动事件的冲突

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

      ```js
      //在data里有一个bMove
      data: function () {
                return {
                  bMove: false,
                };
      //真正滑动时就变成true
      ```

- ## 索引

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

    

