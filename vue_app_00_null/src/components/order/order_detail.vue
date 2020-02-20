<template>
    <div class="order_detail">
        <li>
            <p>
                <span class="title">{{item.title}}</span>
                <span class="time">{{item.time}}</span>
            </p>
            <p>
                <span class="heji">合计</span>
                <span class="sum">￥{{item.sum}}</span>
            </p>
            <transition name="islook">
                <div v-if="islook">
                    <div  v-for="(item2,index2) of detail" :key=index2 >
                        <span><img :src="item2.img" alt="">{{item2.name}}</span>
                        <span>x{{item2.count}}</span>
                        <span>￥{{item2.price}}</span>
                    </div>
                </div>
            </transition>
            <p>
                <span></span>
                <span ref="look" class="look" @click="look()">查看详情</span>
            </p>
        </li>
    </div>
</template>

<script>
export default {
    props:['item'],
    data()
    {
        return{
            islook:'',
            // detail:''
        }
    },
    methods:{
        look()
        {
            if(!this.islook)
            {
                this.islook=1
                this.$refs.look.innerHTML='点击收回'
            }
            else
            {
                this.islook=0
                this.$refs.look.innerHTML='查看详情'
            }
        }
    },
    computed:{
        detail()
        {
            return JSON.parse(this.item.order_)
        }
    }
}
</script>
 
<style lang="scss" scoped>
.order_detail
{
    .islook-enter,.islook-leave-to
    {
      opacity: 0;
    }
    .islook-enter-active
    {
      transition: all .5s ease;
    }
    li
    {
        width: 100%;
        background: white;
        margin-top:1.5rem;
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p
        {
            padding: 10px 0;
            margin: 0;
            width: 80%;
            border-bottom:1px solid #eee ;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title
            {
                color: #333;
                font-size: 1.5rem;
                font-weight: bold;
            }
            .time
            {
                color: #999;
                font-size: .293333rem;
                align-self:flex-end;
                letter-spacing: 0px;
            }
            .heji 
            {
                font-size: 0.9rem;
            }
            .sum
            {
                font-size: 0.9rem;
                color: #ff5339;
            }
            .look
            {
                font-size: 0.7rem;
                color: #666;
            }
        }
        &>div
        {
            display: flex;
            flex-direction: column;
            margin: 0;
            width: 80%;
            div
            {
                padding: 10px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom:1px solid #eee ;
                &>span:nth-child(1)
                {
                    width: 7rem;
                }
                span
                {
                    width: 2.5rem;
                    color: #999;
                    img
                    {
                        width: 2rem;
                        height: 2rem;
                        margin-right: 0.5rem;
                        vertical-align: middle
                    }
                }
            }
        }
        &>p:last-child
        {
            border-bottom:none;
        }
    }
}
</style>
