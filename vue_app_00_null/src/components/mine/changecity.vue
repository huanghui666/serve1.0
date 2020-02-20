
<template>
    <div class="changecity">
        <topball :title="'我的地址'" :button='"新增地址"' :fatherMethod='fatherMethod'></topball>
        <van-address-list
        v-model="chosenAddressId"
        :list="list"
        add-button-text='确认修改'
        @add="sure"
        @edit="onEdit"
        />
        
    </div>
</template>
<script>
import topball from '../public/topBall'
export default {
    components:{topball},
    data() {
        return {
        chosenAddressId: 0,
        list:[]
        }
    },
    created()
    {
        let address = this.$store.state.user_detail
        if(address.length>0)
        {
            let list = []
            let obj = {}
            address.forEach((element,index) => {
            var obj = new Object()
            obj.id= element.id
            obj.name = element.name
            obj.tel = element.tel
            obj.address = (element.province!==element.city)?(element.province+element.city+element.county+element.addressDetail):(element.city+element.county+element.addressDetail)  
            obj.isDefault = element.isDefault
            list.push(obj)  
        });
        this.list = list
        this.chosenAddressId=this.list.filter(res=>{return res.isDefault==1})[0].id
        }
        else
        {
            this.$toast.info('目前还没有地址')
        }
    },
    methods:
    {   
        fatherMethod()
        {
            this.$router.push({path:'/addcity'})
        },
        sure()
        {
            if(!this.$route.params.isorder)
            {
                this.$store.commit('update_user_detail',this.chosenAddressId)
                this.$toast.success('修改成功')
                this.$router.push({path:'/index'})
            }
            else
            {
                this.$store.commit('update_user_detail',this.chosenAddressId)
                this.$toast.success('修改成功')
                this.$router.push({name:'pay',params:this.$route.params})
            }
        },
        onEdit(item, index) {
            this.$router.push({path:'/addcity',query:{item}})
        }
    },
    computed:{
    }
}
</script>
<style lang="scss">
.changecity
{
    .van-button.van-button--danger.van-button--normal.van-button--block.van-button--round.van-address-list__add
    {
        background: #00bfa5;
        border:1px solid #00bfa5;
        border-radius: 4px;
    }
    .van-address-item .van-radio__icon--checked .van-icon
    {
        background: #00bfa5 !important;
        border-color:#00bfa5; 
    }
    .van-address-list__bottom
    {
        background-color: transparent;
    }
}
</style>
