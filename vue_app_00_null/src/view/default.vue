<template>
    <div class="default">
        <component :is="select"></component>
        <div style="height:55px">
        </div>
        <mu-container class="   foot_ball">
            <mu-bottom-nav color="rgb(0, 191, 165)" :value="select">
                <mu-bottom-nav-item value="index" @click="whichactive" title="首页" class="iconfont icon-home" to="/index">
                </mu-bottom-nav-item>

                <mu-bottom-nav-item value="find" @click="whichactive" title="发现" class="iconfont icon-search" to="/find">
                </mu-bottom-nav-item>

                <mu-bottom-nav-item value="order" @click="whichactive" title="订单" class="iconfont icon-order" to="/order">
                </mu-bottom-nav-item>

                <mu-bottom-nav-item value="mine" @click="whichactive" title="我的" class="iconfont icon-account" to="/mine">
                </mu-bottom-nav-item>
            </mu-bottom-nav>
        </mu-container>
    </div>
</template>
<script>
import index from '../components/index/index.vue'
import find from '../components/find/find.vue'
import mine from '../components/mine/mine.vue'
import order from '../components/order/order.vue'
export default {
    data()
    {
        return{
            select:'index'
        }
    },
    methods:{
        whichactive()
        {
            switch(this.$route.path)
            {
                case '/index':
                    this.select='index'
                    break
                case '/find':
                    this.select='find'
                    break
                case '/order':
                    this.select='order'
                    break
                case '/mine':
                    this.select='mine'
                    break    
            }
        }
    },
    components:{index,find,mine,order},
    created()
    {
        this.whichactive()
    },
    watch:
    {
        $route(newvalue,oldvalue)
        {
            this.whichactive()
        }
    }
}
</script>
<style scoped>
.foot_ball
{
    position: fixed;
    bottom:0;
    padding: 0;
}
</style>