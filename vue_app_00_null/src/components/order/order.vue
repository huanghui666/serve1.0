<template>
    <div class="order">
        <topball></topball>
        <ul v-if="hasOrder">
            <orderDetail v-for="(item,index) of data" :key=index :item=item>
            </orderDetail>
        </ul>
        <span v-else class="noorder">
            你还没有下过订单哟！
        </span>
    </div>
</template>

<script>
import topball from '../public/topBall'
import {user_order} from "../../assets/js/user_order_get.js"
import orderDetail from './order_detail'
export default {
    components:{topball,orderDetail},
    data()
    {
        return{
            hasOrder:'',
            data:'',
        }
    },
    methods:{
        
    },
    created()
    {
        let uid = sessionStorage.getItem('uid')
        user_order(uid).then(res=>{
            if(res.data.code==0)
                this.hasOrder=0
            else
            {
                this.hasOrder=1
                this.data = res.data.data
            }
        })
    }
}
</script>
 
<style lang="scss" scoped>
.order
{
    letter-spacing: 1px;
    ul
    {
        list-style: none;
        padding: 0;
        margin: 0 5%;
        width: 90%;
    }
    .noorder
    {
        color: #333;
        font-weight: bold;
        margin-left: 2rem;
        position: relative;
        top: 1rem;
    }
}
</style>
