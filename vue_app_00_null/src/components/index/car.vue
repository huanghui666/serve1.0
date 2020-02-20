<template>
<div class="cart">
    <div>
        <div :class="fill?'fill_cart':'empty_cart'">
            <i :class='!fill?"iconfont icon-cart-Empty":"iconfont icon-cart-full"'></i>
        </div>
        <div>
            <div :class="fill?'fill':'notfill'" v-if="fill" >￥{{this.price}}</div>
            <div :class="fill?'fill':'notfill'" v-else>未选购商品</div>
            <div class="peisong">另需配送费￥4</div>
        </div>
        <div class="jiesuan" v-if="jiesuan"><p>还差{{this.start-this.price}}</p></div>
        <div class="jiesuan go" @click="pay" v-else><p>去结算</p></div>
     </div>
</div>
</template>
<script>
export default {
    props:['shop_id','old','reduction','start','title'],
    data()
    {
        return{
            fill:false,
            price:0,
            jiesuan:false
        }
    },
    computed:{
        shop_order()
        {
            return this.$store.state.order.filter((item)=>{return item.id==this.shop_id})
        }
    },
    methods:{
        pay()
        {
            if(sessionStorage.getItem('uid'))
                this.$router.push({name:'pay',params:{id:this.shop_id,title:this.title,old:this.old,reduction:this.reduction}})
            else
            {
                this.$toast.info('请登录')
                this.$router.push({name:'login_register'})
            }
        }
    },
    mounted()
    {
        if(this.shop_order.length>0)
        {
            this.fill =true
        }
        this.price=this.shop_order.reduce((sum,ele)=>{
                    sum+=ele.count*ele.price
                    return sum
                },0)
    },
    watch:{
        shop_order:{
            immediate:true,
            handler:function(newVal,oldVal)
            {
                this.price=this.shop_order.reduce((sum,ele)=>{
                    sum+=(ele.count?ele.count:0)*(ele.price?ele.price:0)
                    return sum
                },0)
                if(this.price>0)
                {
                    this.fill=true
                    if(this.price>this.start)
                        this.jiesuan=false
                    else
                        this.jiesuan=true
                }
                else
                {
                    this.fill=false
                    this.jiesuan=true
                }
            },
            deep:true
        },
    }
};
</script>
 
<style lang="scss" scoped>
// @import url(//at.alicdn.com/t/font_1539081_0rhse6lba9n.css);
.jiesuan
{
    // padding: 0.5rem;
    color: white;
    font-weight: bolder;
    font-size: 1.1rem;
    display: flex;
    justify-content: center;    
    align-items: center;
    flex-direction: column;
    p
    {
        padding: 0;
        margin: 0;
        position: relative;
        top: -0.2rem;
    }
}
.go
{
    background: #00bfa5;
}
.fill
{
    color: white;
    font-size: 1.3rem;
}
.notfill
{
    color: #999;
    font-size: 1rem;
    padding: 0.2rem 0;
}
.peisong
{
    color: #999;
    font-size: 0.8rem;
}
.iconfont.icon-cart-Empty
{
    text-align: center;
    line-height: 2.5rem;
    position: absolute;
    top: 0;
    color: #5f5f64;
    font-size: 2.5rem;
    margin-top: 0.25rem;
    margin-left: 0.1rem;
}
.iconfont.icon-cart-full
{
    text-align: center;
    line-height: 2.5rem;
    position: absolute;
    top: 0;
    color: white;
    font-size: 2.5rem;
    margin-top: 0.25rem;
    margin-left: 0.1rem;
}
.cart
{
    background: rgba(61,61,63,.9);
    height:3.5rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    &>div
    {
        margin-left:  10%;
        display: flex;
        justify-content: space-between;
        &>div:nth-child(1)
        {
            margin: 0;
            border-radius: 50%;
            height: 4rem;
            width: 4rem;
            position: relative;
            top: -1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        }
        &>div:nth-child(2)
        {
            padding-left:1rem; 
            width: 60%;
        }
        &>div:nth-child(3)
        {
            width: 30%;
        }
        .fill_cart
        {
            background: #00bfa5;
            border: 0.4rem solid white;
        }
        .empty_cart
        {
            background: rgb(54,54,54);
             border: 0.4rem solid rgb(68, 68, 68);
        }
    }
}
</style>
