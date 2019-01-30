/* eslint-disable camelcase */
import Vue from 'vue'
import VueRouter from 'vue-router'

var admin = r => require.ensure([], () => r(require('../views/admin.vue')), 'admin')
var user = r => require.ensure([], () => r(require('../views/user.vue')), 'user')
var upload = r => require.ensure([], () => r(require('../views/upload.vue')), 'upload')

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash', // hash 打包需要使用hash 无#： history
  routes: [{
    path: '/',
    component: user
  },{
    path: '/admin',
    component: admin
  },
  {
    path: '/:customer/:fee',
    component: upload
  }]
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(route => {
  window.scrollTo(0, 0);
  console.log("跳转")
})
export default router
