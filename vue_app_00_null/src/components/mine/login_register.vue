<template>
<div class="login_register">
    <!-- <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    /> -->
    <topball></topball>
    <!-- <div class="banner">
    </div> -->

    <transition name="login_tra">
      <div v-if="isshow==1">
        <login v-on:login_over="which_show"></login>
      </div>
    </transition>

    <transition name="register_tra">
      <div v-if="isshow==2">
        <register v-on:registerover="which_show"></register>
      </div>
    </transition>

    <transition name="forget_tra">
      <div v-if="isshow==3">
        <forget></forget>
      </div>
    </transition>
</div>

</template>
<script>
import topball from '../public/topBall'
import login from './login'
import register from './register'
import forget from './forget'
export default {
  data () {
    return {
      isshow:1,
    }
  },
  components:{login,register,forget,topball},
  methods: {
    which_show(item)
    {
      this.isshow=item
    },
    onClickLeft() {
      Toast('返回');
    }
  }
}
</script>
<style lang="scss" scoped>

    .login_tra-leave,.register_tra-leave
    {
      opacity: 0;
    }
    .login_tra-enter,.register_tra-enter
    {
      opacity: 0;
    }
    .login_tra-enter-active, .login_tra-leave-active {
      transition: opacity .5s;
    }
    .register_tra-enter-active, .register_tra-leave-active {
      transition: opacity .5s;
    }
    // .banner
    // {
    //   background: #00bfa5;
    //   height: 3rem;
    // }
    .login
    {
        position: absolute;
        width: 80% !important;
        margin: 0 10%;
        .title
        {
          width: 100%;
          display: flex;
          align-items: center;
          height:5rem;
          border-bottom: 1px solid #f1f1f1;
          margin-bottom: 1rem;
          h2
          {
            font-size: 1.5rem;
          }
        }
        &>div:nth-child(2)
        {
          padding: 0;
          .upwd
          {
            margin-bottom: 0.2rem;
          }
          .submit
          {
            font-size: 1.2rem;
            line-height: 3rem;
            height: 3rem;
            width: 100%;
            text-align: center;
            color: rgba(0,0,0,.54);
            background: #f1f1f1;
            border-radius: 4px;
            margin: 0.3rem 0;
          }
          .other
          {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
        }
    }
    .register
    {
        position: absolute;
        width: 80% !important;
        margin: 0 10%;
        .title  
        {
          width: 100%;
          display: flex;
          align-items: center;
          height:5rem;
          border-bottom: 1px solid #f1f1f1;
          margin-bottom: 1rem;
          h2
          {
            font-size: 1.5rem;
          }
        }
        &>div:nth-child(2)
        {
          padding: 0; 
        }
        .submit
        {
          font-size: 1.2rem;
          line-height: 3rem;
          height: 3rem;
          width: 100%;
          text-align: center;
          color: rgba(0,0,0,.54);
          background: #f1f1f1;
          border-radius: 4px;
          margin: 0.3rem 0;
        }
    }
</style>