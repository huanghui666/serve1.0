import Vue from 'vue'       //vue实例对象
import App from './App.vue' //根组件
import router from './router'//路由模块
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Message from 'muse-ui-message';
import Toast from 'muse-ui-toast';
import qs from 'qs'
Vue.prototype.$qs = qs;

//4~65全部删除
//功能一:引入河配置mint-ui组件库
// 1:引入mint-ui组价库所有组件
import MintUI from "mint-ui";
// 2:单独引入mint-ui组件库中的样式文件
import "mint-ui/lib/style.css"
import vant from 'vant';
const ToastOption = {
  position: 'top', // 弹出的位置
  time: 1000, // 显示的时长
  closeIcon: 'close', // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: 'check_circle', // 成功信息图标
  infoIcon: 'info', // 信息信息图标
  warningIcon: 'priority_high', // 提醒信息图标
  errorIcon: 'warning' // 错误信息图标
}
// 3:注册MintUI对象
Vue.use(MintUI)
Vue.use(MuseUI);
Vue.use(Message);
Vue.use(Toast,ToastOption);
Vue.use(vant);
//4引入字体图标对象
import Icon from "./assets/default/iconfont.css";
// import ".font/iconfint.css"
// #注意顺序在new Vue之前
//5引入axios库
import axios from "axios";
// 6 配置访问服务器基础路径
import { Notify } from 'vant';
axios.defaults.baseURL="http://127.0.0.1:4001/"
// 配置sesstion
axios.defaults.withCredentials=true
// 注册
Vue.prototype.axios = axios;

// 引入vuex
import Vuex from "vuex"
//10:注册vuex
Vue.use(Vuex);
import { Lazyload } from 'vant'
Vue.use(Lazyload, {
  lazyComponent: true
});
//11:创建存储对象
var store = new Vuex.Store({
    state:(sessionStorage.getItem('state'))? JSON.parse(sessionStorage.getItem('state')):
    {
      user_detail:[],
      order:[]
    },
    mutations:
    {
      clear(state)
      {
        state.user_detail=[];
        state.order=[]
      },
      set_user_detail(state,newVal){
        state.user_detail=newVal
      },
      add_user_detail(state,newVal){
       
        let arr =state.user_detail.map(ele=> ele.id)
        if(!arr.some(ele=>ele==newVal.id))
        {
          if(newVal.isDefault==true)
          {
            axios.get('update_isDefault',{params:{id:newVal.id}})
            let isDefault = state.user_detail.filter((ele,index)=>{return ele.isDefault==1})
            let index = state.user_detail.indexOf(isDefault[0])
            if(index==-1)
              state.user_detail.push(newVal)
            else
            {
              state.user_detail[index].isDefault = 0
              state.user_detail.push(newVal)
            }
          }
          else
            state.user_detail.push(newVal)
        }
        else
        {
          let index = arr.indexOf(newVal.id)
          state.user_detail[index]=newVal
          if(newVal.isDefault==true)
          {
            let isDefault = state.user_detail.filter((ele,index)=>{return ele.isDefault==1})
            let index = state.user_detail.indexOf(isDefault[0])
            state.user_detail[index].isDefault = 0
          }
        }
      },
      update_user_detail(state,newVal)
      {
        axios.get('update_isDefault',{params:{id:newVal}})
        state.user_detail.forEach((element,index) => {
            if(element.id==newVal)
              state.user_detail[index].isDefault=1
            else
              state.user_detail[index].isDefault=0
        });
      },
      addOrder(state,newVal){state.order.push(newVal)},
      updOrder(state,newVal){

        let check =state.order.findIndex((item)=>{
          return (item.name == newVal.name)
        })
        state.order[check].count=newVal.count
      },
      redOrder(state,newVal){
        let check =state.order.findIndex((item)=>{
          return (item.name == newVal.name)
        })
        state.order.splice(check,1)
      },
      delOrder(state,newVal)
      {

        let arr = []
        for(let i =0 ; i<state.order.length ; i++)
        {
          if(state.order[i].id == newVal.id)
          {
            arr.push(state.order[i])
            state.order.splice(i, 1)
            i=-1
            // state.order.splice(state.order.findIndex(item => item.id == newVal), 1)
          }
        }
        axios.post("user_order",qs.stringify({sum:newVal.sum,uid:newVal.uid,title:newVal.title,order:JSON.stringify(arr)}))
      }
    },
    getters:
    {
      id_user_detail:(state) => (id) => {
        return state.user_detail.filter(ele => {return ele.id==id})[0]
       }
    }
})
//12:将存储对象添加vue 31
//#注意顺序在new Vue之前
//以下四个一定是在main.js最后
new Vue({
  router,             //路由对象
  render: h => h(App),
  store              //!存储对象 
  //h = createElement
}).$mount('#app')
