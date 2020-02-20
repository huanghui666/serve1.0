<template>
  <div class="product_detail">

        <div class="topBall">
            <div class="head_ball">
                <div class="bb" @click="back">
                    <i  class="mintui mintui-back"></i>
                    <label class="back">返回</label>                                                                                     
                </div>
            </div>
        </div>

        <div :style="{backgroundImage:'url(' + this.$route.query.img + ')'}" ref="banner" class="banner">
            
        </div>

        <div class="titleImage">
            <img style="object-fit:cover;height:5rem;width:5rem" :src="this.$route.query.img" alt="">
        </div>

        <div class="detail_text">
            <span>{{topdata.title}}</span>
            <p>
                <span>评价{{topdata.appraise}}</span>
                <span>月售{{topdata.popularity}}</span>
            </p>
            <div>
                <span class="reduce">满{{topdata.old}}减{{topdata.reduction}}</span>
          </div>
        </div>
        <div>
            <!-- <mu-tabs id="title" :value.sync="active"  indicator-color="#00bfa5" color="#f9f9f9">
                <mu-tab style="color:#333">订餐</mu-tab>
                <mu-tab style="color:#333">评价</mu-tab>
            </mu-tabs> -->
        </div>
        <div class="demo-text order_fan" v-if="active === 0">
            <bottomBall v-if="leftdata.length>0 && rightdata.length>0" :start='topdata.start' :leftdata='leftdata' :rightdata='rightdata' :old='topdata.old' :reduction='topdata.reduction' :title2='topdata.title'></bottomBall>
        </div>
        <!-- <div class="demo-text" v-if="active === 1">
                234
        </div> -->

        <div style="height:3.5rem;width:100%"></div>

  </div>
</template>

<script>
import bottomBall from '../index/bottomBall'

export default {
    data()
    {
        return{
            active:0,
            topdata:[],
            leftdata:[],
            rightdata:[]
        }
    },
    created()
    {
        // this.$refs.banner.style.background="this.$route.query.img"
        let that = this
        function a()
        {
            return new Promise(
                function(resolve,reject) 
                {
                     that.axios.get('productlist',{params:{id:that.$route.params.id}}).then((result)=>{
                        that.topdata = result.data.data[0]
                    })
                })
        }
        function b()
        {
            return new Promise(
                function(resolve,reject)
                {
                     that.axios.get('productlistleft',{params:{id:that.$route.params.id}}).then((result)=>{
                        that.leftdata = result.data.data
                    })
                })
        }
        function c()
        {
            return new Promise(
                function(resolve,reject)
                {
                     that.axios.get('productlistright',{params:{id:that.$route.params.id}}).then((result)=>{
                        that.rightdata = result.data.data
                    })
                })
        }
        Promise.all([a(),b(),c()])
       
    },
    methods:{
        back()
        {
            this.$router.push({name:'index'})
        }
    },
    components:{bottomBall},
};
</script>
 
<style lang="scss" scoped>
.head_ball,.bb,.topBall
{
    background: transparent;
    display: inline;
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    color: white;
    z-index: 2;
}
.order_fan
{
    display: flex;
    width: 100%;
    justify-content: space-between
}
.mu-tab-active
{
    font-weight: bolder;
}
.product_detail
{
    letter-spacing: 1px;
    .banner
    {
        // background: red;    
        width: 100%;
        height: 6rem;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        background-size:cover;
        background-repeat:no-repeat;
        background-position:center;
        // background: #666;
        filter: blur(2px);
    }
    .titleImage
    {
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        top: -2.5rem;
        overflow: hidden;
        img
        {
            width: 5rem;
            height: 5rem;
        }
    }
    .detail_text
    {
        height: 7rem;
        // background: white;
        // background: rgb(234, 234, 239);
        margin-top: -2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &>span:nth-child(1)
        {
            font-size: 18px;
            font-weight: 700;
        }
        &>p
        {
            font-size: 12px;
            color: #666;
            span
            {
                margin: 0 0.5rem;
            }
        }
        .reduce
        {
            margin: 0 0.5rem;
            display: inline-block;
            background: rgba($color: #ff5a5a, $alpha: 0.1);
            border: 1px solid rgba($color: #ff5a5a, $alpha: 0.3);
            border-radius: 0.2rem;
            padding: 0 0.1rem;
            font-size:0.6rem;
            font-weight: normal;
            letter-spacing: 1px
        }
    }
    &>div:nth-child(3)
    {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ebebeb;
        .mu-tab
        {
            width: 50%;
            color: #333;
            // font-weight: 700;
        }
        #title
        {
            display: flex;
            justify-content: space-around;
        }
    }
    .bottom
    {
        display: flex;
        justify-content: space-between;
    }
}
    
</style>
