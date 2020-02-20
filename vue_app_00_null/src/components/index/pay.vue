<template>
  <div class="pay">
        <topball></topball>
        <div class="top">
            <p>订单配送至</p>
            <p @click="choose()">{{userDetail.addressDetail}} <i class="iconfont icon-arrow-right"></i></p>
            <p @click="choose()">
                <span>{{userDetail.name}}</span>
                <span>{{userDetail.tel}}</span>
            </p>
        </div>
        <div class="choose">
            <p>
                <span>支付方式</span>
                <span @click="payWay('')">{{way}}</span>
            </p>
            <p class="zf" v-if="zf">
                <span></span>
                <span @click="payWay('微信')">微信</span>
            </p>
            <p class="zf" v-if="zf">
                <span></span>
                <span @click="payWay('支付宝')">支付宝</span>
            </p>
        </div>
        <div class="middle">
            <h5>{{this.$route.params.title}}</h5>
            <ul>
                <li v-for="(item,index) of order" :key=index>
                    <span><img :src="item.img" alt="">{{item.name}}</span>
                    <span>x{{item.count}}</span>
                    <span>￥{{item.price}}</span>
                </li>
                <li>
                    <span>配送费</span>
                    <span></span>
                    <span>￥4</span>
                </li>
                <li v-if="ismanzu">
                    <span>店铺优惠</span>
                    <span></span>
                    <span>-￥{{this.$route.params.reduction}}</span>
                </li>
                <li>
                    <span>合计</span>
                    <span></span>
                    <span>￥{{this.sum}}</span>
                </li>
            </ul>
        </div>
        <div class="bottom">
            <span>￥{{this.sum}}</span>
            <span @click="finish">去支付</span>
        </div>
  </div>
</template>

<script>
import topball from '../public/topBall'
export default {
    components:{topball},
    data()
    {
        return{
            order:[],
            ismanzu:'',
            sum:'',
            userDetail:'',
            way:'请选择 >',
            zf:''
        }
    },
    created()
    {
        this.userDetail = this.$store.state.user_detail.filter(ele=>{return ele.isDefault==1})[0]
        this.order = this.$store.state.order.filter((elm)=>{
            return elm.id==this.$route.params.id
        })
        this.sum = this.$store.state.order.reduce((pre,Element)=>{
            return pre+=parseInt(Element.count)*parseInt(Element.price)
        },0)
        if(this.sum>this.$route.params.old)
        {
            this.sum-=this.$route.params.reduction,
            this.sum+=4
            this.ismanzu=1
        }
        else
        {
            this.sum+=4
            this.ismanzu=0
        }
    },
    methods:{
        choose()
        {
            this.$route.params.isorder=1
            this.$router.push({name:'changecity',params:this.$route.params})
        },
        payWay(item)
        {
            if(!item)
                this.zf=!this.zf
            if(item)
            {
                this.zf=!this.zf
                this.way=item
            }
        },
        finish()
        {
            if(this.way=='请选择 >')
                this.$toast.info('请选择支付方式')
            else if(!sessionStorage.getItem('uid'))
            {
                this.$toast.info('请登录')
                this.$router.push({path:'/login_register'})
            }
            else
            {
                this.$toast.success('支付完成')
                this.$route.params.uid=sessionStorage.getItem('uid')
                this.$route.params.sum=this.sum
                this.$store.commit('delOrder',this.$route.params)
                this.$router.push({path:'/index'})
            }
        }
    }
}
</script>
 
<style lang="scss" scoped>
    .pay
    {
        background-image: linear-gradient(#00bfa5 30%, #fafafa 70%);
        letter-spacing: 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        h5
        {
            padding: 0;
            margin: 0;
        }
        .top
        {
            width: 100%;
            // background: #00bfa5;
            display: flex;
            flex-direction: column;
            align-items: center;
            p
            {
                margin: 0;
                padding: 0;
                padding: 0.2rem 0;
                width: 90%;
            }
            &>p:nth-child(1)
            {
                color: hsla(0,0%,100%,.8);
                font-size: 0.9rem;
                padding-top: 1rem;
            }
            &>p:nth-child(2)
            {
                color: white;
                font-size: 1.5rem;
                font-weight: bolder;
                display: flex;
                align-items: center;
            }
            &>p:nth-child(3)
            {
                color: white;
                font-size: 1rem;
                padding-bottom: 1rem;
                &>span:nth-child(1)
                {
                    margin-right: 1rem;
                }
            }
        }
        .choose
        {
            background: white;
            width: 90%;
            padding: 0.5rem 1rem;
            margin: 1rem 0;
            p
            {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0.5rem 0;
                padding: 0;
                box-sizing: border-box;
                span
                {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            .zf
            {
                // border-bottom: 1px solid #eee;
            }
        }
        .middle
        {
            background: white;
            width: 90%;
            padding: 0 1rem;
            &>h5:nth-child(1)
            {
                color: #333333;
                padding: 0;
                margin: 0;
                font-size: 1.2rem;
                border-bottom: 0.5px solid #eee;
                padding: 1rem 0;
            }
            ul
            {
                li
                {
                    border-bottom: 0.1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    padding: 0.9rem 0;
                    &>span
                    {
                        width: 4rem;
                        display: flex;
                        align-items: center;
                    }
                    &>span:nth-child(1)
                    {
                        width: 6rem;
                        img
                        {
                            width: 2rem;
                            height: 2rem;
                            margin-right: 0.5rem;
                        }
                    }
                    &>span:nth-child(2)
                    {
                        justify-content: center
                    }
                    &>span:nth-child(3)
                    {
                        justify-content: flex-end
                    }
                }
                &>li:last-child
                {
                    font-size: 1.2rem;
                    font-weight: bolder;
                    color: #ff5a5a;
                }
            }
        }
        .bottom
        {
            width: 100%;
            position: fixed;
            bottom: 0;
            height: 3.5rem;
            background: rgba(61,61,63,0.9);
            line-height: 3.5rem;
            display: flex;
            justify-content: space-between;
            padding: 0 0 0 5%;
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
            &>span:nth-child(2)
            {
                width: 40%; 
                background: #00bfa5; 
                box-sizing: border-box;
                display: flex;
                justify-content: center;
            }
        }
    }
</style>
