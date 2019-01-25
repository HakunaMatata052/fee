import Vue from 'vue'
import App from './App.vue'
import User from './user.vue'
import Admin from './admin.vue'
import ElementUI from 'element-ui';
import vueResource from 'vue-resource';
import VueRouter from 'vue-router'
import echarts from 'echarts'
 
Vue.prototype.$echarts = echarts;
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(vueResource);

const routes = [
  { path: '/', component: User },
  { path: '/admin', component: Admin }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
