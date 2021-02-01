<template>
  <div id="list">
    <ul class="list_user"
        ref='listUser'
        @touchmove="bMove=true">
      <li v-for="item in userData"
          :key="item.index">
        <p>{{item.index}}</p>
        <ul>
          <li @touchend="showTel(user.tel)"
              v-for="user in item.users"
              :key="user.name">{{user.name}}</li>
        </ul>
      </li>
    </ul>
    <ul class="list_index">
      <li @touchstart="setScroll"
          v-for="item in userIndex"
          :key="item">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import myAlert from './alert.js'
export default {
  name: 'my-list',
  data() {
    return {
      bMove: false,
    }
  },
  props:{
    'user-data':{
      type:Array,
      default: function () {return [];  }
      },
  },
  computed: {
    userIndex: function () {
      return this.filterIndex(this.userData)
    },
  },
  methods: {
    filterIndex: function (data) {
      let result = []
      data.forEach((item) => {
        if (item.index) {
          result.push(item.index)
        }
      })
      return result
    },
    setScroll: function (ev) {
      let aL = this.$refs.listUser.getElementsByTagName('li'),
        aP = this.$refs.listUser.getElementsByTagName('p')
      for (let i = 0; i < aP.length; i++) {
        if (aP[i].innerHTML == ev.target.innerHTML) {
          document.documentElement.scrollTop = aP[i].offsetTop
        }
      }
    },
    showTel: function (tel) {
      // 加一个开关，在bMove为true时点击就会变成false,开关打开，展示号码
      if (!this.bMove) {
        myAlert({
          title: "呼叫",
          body: tel,
          cancelBtn: function () {
            alert(2);
            document.body.removeChild(document.getElementById('alert'));
          },
          confirmBtn: function () {
            alert(1);
          },
        });
      } else {
        this.bMove = false;
      }
    },
  },
}
</script>
<style>
.list_user p {
  background-color: #ccc;
  padding-left: 10px;
}
.list_user ul li {
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  border-bottom: 1px solid#ccc;
}
.list_index {
  position: fixed;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
}
.list_index > li {
  margin-top: 5px;
}
</style>