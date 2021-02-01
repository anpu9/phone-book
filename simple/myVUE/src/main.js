import Vue from 'vue'
import App from './App.vue'
import Header from './header.vue'
import List from './list.vue'

Vue.component(Header.name,Header)
Vue.component(List.name,List)
new Vue({
  el: '#app',
  render: h => h(App)
})
