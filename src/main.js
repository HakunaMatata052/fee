import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import vueResource from 'vue-resource';
import echarts from 'echarts'
import router from './router/routers'
 
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(vueResource);

Vue.prototype.$status = {
  api:'http://192.168.0.253:9000'
}

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
