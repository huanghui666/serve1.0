import Vue from 'vue'
import Router from 'vue-router'  //引入路由
import default_ from "./view/default.vue"  //hello组件
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {path:'/',component:default_,
      children: [{
        path: '/find',
        name: 'find',
        props:true,
        component:() => import(/* webpackChunkName: "find" */ './components/find/find.vue'),
      },
      {
        path: '/mine',
        name: 'mine',
        component:() => import(/* webpackChunkName: "find_detail" */ './components/mine/mine.vue')
      },
      {
        path: '/index',
        name: 'index',
        component:() => import(/* webpackChunkName: "index" */ './components/index/index.vue')
      },
      {
        path: '/order',
        name: 'order',
        component:() => import(/* webpackChunkName: "find_detail" */ './components/order/order.vue')
      },
      {
        path: '',
        name: 'index',
        component:() => import(/* webpackChunkName: "find" */ './components/index/index.vue')
      }]
    },
    {
      path: '/find_detail',
      name: 'find_detail',
      component:() => import(/* webpackChunkName: "find_detail" */ './components/find/find_detail.vue')
    },
    {
      path: '/changcity',
      name: 'changcity',
      component:() => import(/* webpackChunkName: "find_detail" */ './components/index/changcity.vue')
    },
    {
      path: '/change',
      name: 'change',
      component:() => import(/* webpackChunkName: "find_detail" */ './components/mine/change.vue')
    },
    {
      path: '/search',
      name: 'search',
      component:() => import(/* webpackChunkName: "find_detail" */ './components/index/search.vue')
    },
    {
      path: '/product_detail/:id',
      name: 'product_detail',
      component:() => import(/* webpackChunkName: "find_detail" */ './components/index/product_detail.vue')
    },
    {
      path: '/changecity',
      name: 'changecity',
      component:() => import(/* webpackChunkName: "find_detail" */ './components/mine/changecity.vue')
    },
    {
      path: '/user',
      name: 'user',
      component:() => import(/* webpackChunkName: "find_detail" */ './components/mine/user.vue')
    },
    {
      path: '/login_register',
      name: 'login_register',
      component:() => import(/* webpackChunkName: "find_detail" */ './components/mine/login_register.vue')
    },
    {
      path: '/addcity',
      name: 'addcity',
      component:() => import(/* webpackChunkName: "find_detail" */ './components/mine/addcity.vue')
    },
    {
      path: '/pay',
      name: 'pay',
      component:() => import(/* webpackChunkName: "find_detail" */ './components/index/pay.vue')
    }
  ]
})