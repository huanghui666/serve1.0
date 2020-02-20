<template>
  <div class="find_detail">
        <topball></topball>
        <mu-container>
            <mu-card style="width: 100%; margin: 0 auto;">

                <mu-card-header :title="data.author" :sub-title="data.about">
                    <mu-avatar slot="avatar">
                    <img :src="data.author_img">
                    </mu-avatar>
                </mu-card-header>

                <mu-card-media :title="data.title" :sub-title="data.se_title">
                    <img :src="data.image">
                </mu-card-media>

                <mu-card-title :title="data.title2" :sub-title="data.se_title2">
                </mu-card-title>

                <mu-card-text>
                    {{data.page}}
                </mu-card-text>

            </mu-card>
            <!-- <div class="select">
              <productProfiles :item='item'></productProfiles>
            </div> -->
            <h4>-- 相关商家 --</h4>
            <div class="select">
              <div class="img" :style="{backgroundImage:'url(' + item.img + ')'}">
              </div>

              <div class="right">
                <div>
                  {{item.name}}
                </div>
                <div>
                  <span>￥{{item.nowPrice}}</span>
                  &nbsp;<span>门面价：￥{{item.pastPrice}}</span>
                </div>
                <div class="to">
                  <span @click='to(item)'>进入店铺</span>
                </div>
              </div>
            </div>
        </mu-container>
        
  </div>
</template>

<script>
import topball from '../public/topBall'
import productProfiles from '../index/product_profiles'
export default {
  data()
  {
    return{
      data:"",
      item:""
    }
  },
  methods:{
    to(item)
    {
      this.$router.push({
          path:`/product_detail/${this.item.id}`,
          query:{'img':`${this.item.img}`}
      })
    },
  },
  components:{topball,productProfiles},
  mounted()
  {
    this.data=this.$route.params.list
      this.axios.get('product_id',{params:{id:this.data.id}}).then(res=>{
        this.item=res.data.data[0]
        })
  }
};
</script>
 
<style lang="scss">
.find_detail
{
  .container
{
  padding: 0 !important
}
  .find_detail
  {
    letter-spacing: 1px;
  }
  .container
  {
    padding: 0.5rem;
  }
  .text
  {
      margin-top:1rem; 
      border-top: 1px solid rgba($color: #E0E0E0, $alpha: 0.5)
  }
  .head_ball
  {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 3rem;
    background: #0fe3cd;
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
  .mu-carousel
  {
      height: 20rem;
  }
  .swipe
  {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img
    {
        width:100%;
        height: 100%;
        
    }
  }
  .select
  {
    width: 100%;
    margin-top: 1rem;
    border-radius: 2px;
    box-shadow:0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    background: white;
    height: 7rem;
    display: flex;
    justify-content: space-between;
    // padding: 0.3rem;
    .img
    {
      width: 33.3%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-radius: 2px;
      border: 0.4rem solid transparent;
    }
    .right
    {
      padding-left:2rem; 
      padding-bottom: 0.5rem;
      width: 66.67%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      letter-spacing: 1px;
      font-family: Roboto,Lato,sans-serif;
      padding-top: 0.4rem;
      div:nth-child(1)
      {
        font-size: 1.2rem;
        font-weight: bold;
        padding-left: 0.5rem;
      }
      &>div:nth-child(2)
      {
        &>span:nth-child(1)
        {
          color: #ff5a5a;
          font-weight: bold;
          font-size: 1rem;
          letter-spacing: 1px;
        }
        &>span:nth-child(2)
        {
          font-size: 0.6rem;
          color: #8E8E8E;
          text-decoration:line-through
        }
        margin-right: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #dddddd;
      }
      .to 
      {
        padding-right: 1rem;
        font-weight: bold;
        font-size: 0.9rem;
        // text-align: right;
        flex-grow:1;
        display: flex;
        flex-direction: row-reverse;
        align-items: flex-end;
        color: #757575;
      }
    }
  }
    h4
    {
        text-align: center;
    }
}

</style>