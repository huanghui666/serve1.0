<template>
  <div @click='to(item)' class="productProfiles" >
      <img :src="item.img" />
      <h5>{{item.name}}</h5>
      <div>
        <div>          
          <span>￥{{item.nowPrice}}</span>
          <span>￥{{item.pastPrice}}</span>
          <div>
            <span class="reduce">已减{{item.pastPrice-item.nowPrice}}元</span>
          </div>
        </div>
        <p>{{item.popularity}}人来过</p>
      </div>
  </div>
</template>

<script>
export default {
  props:['item'],
  methods:{
    to(item)
    {
      this.$router.push({
          path:`/product_detail/${item.id}`,
          query:{'img':`${item.img}`}
      })
    },
  },
  
};
</script>
 
<style lang="scss" scoped>
  // color
  // {
  //   #ff5a5a
  // }
  .productProfiles
  {
    background: #F0F0F0;
    img
    {
      width: 100%;
      max-height: 10rem
    }
    h5
    {
      margin:0.5rem 0;
      letter-spacing: 1px;
      padding-left: 0.2rem;
    }
    div
    {
      div
      {
        padding-left: 0.5rem;
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
         &>div
         {
           display: inline-block;
           background: rgba($color: #ff5a5a, $alpha: 0.1);
           border: 1px solid rgba($color: #ff5a5a, $alpha: 0.3);
           border-radius: 0.2rem;
           margin-left:0.5rem;
           padding: 0 0.1rem;
           .reduce
           {
             font-size:0.6rem;
             font-weight: normal;
             letter-spacing: 1px
           }
         }
      }
      p
      {
        font-size: 0.5rem;
        margin: 0.2rem 0;
        color: #ADADAD;
        padding-left: 0.5rem;
        letter-spacing: 1px;
      }
    }
  }

</style>
