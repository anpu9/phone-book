<template>
  <div id="app">
    <my-header custom-title="通讯录"
               custom-fixed>
      <template #left><button @touchstart="backBtn">返回</button></template>
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
  {
    index: 'B',
    users: [
      { name: 'b1', tel: '15082678867' },
      { name: 'b2', tel: '15082678867' },
      { name: 'b3', tel: '15082678867' },
    ],
  },
  {
    index: 'C',
    users: [
      { name: 'c1', tel: '15082678867' },
      { name: 'c2', tel: '15082678867' },
      { name: 'c3', tel: '15082678867' },
    ],
  },
  {
    index: 'D',
    users: [
      { name: 'd1', tel: '15082678867' },
      { name: 'd2', tel: '15082678867' },
      { name: 'd3', tel: '15082678867' },
    ],
  },
  {
    index: 'E',
    users: [
      { name: 'e1', tel: '15082678867' },
      { name: 'e2', tel: '15082678867' },
      { name: 'e3', tel: '15082678867' },
    ],
  },
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
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
</style>
