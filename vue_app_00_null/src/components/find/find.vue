<template>
  <div class="find">
    <topball></topball>
    <mu-container >
      <mu-tabs id="title" :value.sync="active"  indicator-color="#00bfa5" color="#f9f9f9">
        <mu-tab style="color:#00bfa5">快餐</mu-tab>
        <mu-tab style="color:#00bfa5">甜品</mu-tab>
        <mu-tab style="color:#00bfa5">炸串</mu-tab>
        <mu-tab style="color:#00bfa5">汉堡</mu-tab>
        <mu-tab style="color:#00bfa5">早餐</mu-tab>
      </mu-tabs>
      <div class="demo-text">
        <findList :active='active' :city='city'></findList>
      </div>
    </mu-container>
  </div>
</template>

<script>
import topball from '../public/topBall'
import findList from './find_list'
export default {
  data()
  {
    return{
      active:0,
      city:''
    }
  },
  components:{topball,findList},
  methods:{
    windowScroll()
    {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop 
        if(scrollTop>51)
        {
            title.className="mu-tabs fixed"
        }
        else
        {
            title.className="mu-tabs "
        }
    }
  },
  mounted() 
  {
      window.addEventListener('scroll', this.windowScroll)
  },
  destroyed () 
  {
      window.removeEventListener('scroll', this.windowScroll)
  },
  created()
  {
    if(sessionStorage.getItem('uid'))
    {
      let default_place = this.$store.state.user_detail.filter(ele=>{
          return ele.isDefault==1})
      if(default_place.length>0)
      {
          this.city= default_place[0].city
      }
      else
      {
          this.$router.push({path:'/changecity'})
          this.$toast.info('请选择配送地址')
      }
    }
    else
    {
      this.$router.push({path:'/login_register'})
    }
  },
};
</script>
<style lang="scss">
.find
{
  .mu-grid-list
{
  padding: 0 !important
}
.container
{
  padding: 0 !important;
}
.mu-grid-list
{
  padding: 0.25rem
}
#title
{
    box-shadow: 0px 5px 30px #f9f9f9;
}
  .fixed
  {
    position:fixed;
    top:0;
    z-index:5;
    background: #f9f9f9 !important;
  }
  .container
  {
    padding-left: 0;
    padding-right: 0;
  }
  .mu-grid-tile>img
  {
    width: 100%;
  }
  .head_ball
  {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 3rem;
    background: #00bfa5;
    i
    {
      font-size: 14px;
      margin-left: 0.5rem;
      color: white
    }
    .back
    {
      font-size: 14px;
      margin-left: 0.2rem;
      color: white
    }
  }
  .mu-tabs
  {
      overflow: hidden;
      overflow-x: auto;
      white-space:nowrap;
  }
}

</style>