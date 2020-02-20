<template>
<div class="change">
    <topball></topball>
      <div v-if="isshow==1">
        <changeuname></changeuname>
      </div>
      <div v-if="isshow==2">
        <changephone></changephone>
      </div>
      <div v-if="isshow==3">
        <changeupwd></changeupwd>
      </div>
</div>

</template>
<script>
import topball from '../public/topBall'
import changeupwd from './changeupwd'
import changephone from './changephone'
import changeuname from './changeuname.vue'
export default {
  data () {
    return {
        isshow:''
    }
  },
  components:{topball,changeupwd,changephone,changeuname},
  mounted()
  {
    sessionStorage.getItem('user_name')
    switch(this.$route.query.witch)
    {
      case 'uname':
        this.isshow=1
        break
      case 'phone':
        this.isshow=2
        break
      case 'upwd':
        this.isshow=3
        break
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
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