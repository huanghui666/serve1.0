<template>
<div class="addcity">
    <topball></topball>
    <!-- :address-info="addressInfo" -->
        <van-address-edit
        :address-info='addressInfo'
        :area-list="areaList"
        show-set-default
        @save="onSave"
    />
</div>
    
</template>
<script>
import topball from '../public/topBall'
import areaList from '@/assets/json/areaList'
import {user_detail_post} from "../../assets/js/user_detail_post"
import querystring from 'querystring'
export default {
    data() {
        return {
        uname:'1',
        areaList,
        addressInfo:''
        }
    },
    components:{topball},
    created()
    {
        this.areaList=areaList
        if(this.$route.query.item)
        {
            let item= this.$route.query.item
            // let item = this.$router.getter('id_user_detail',index)
            this.addressInfo = {
                id:item.id,
                name:item.name,
                tel:item.tel,
            }
        }
        else
            this.addressInfo=''
    },
    methods: {
        onSave(content) {
            let obj = 
            {
            name:content.name,
            tel:content.tel,
            province:content.province,
            city:content.city,
            county:content.county,
            addressDetail:content.addressDetail,
            areaCode:content.areaCode,
            isDefault: Boolean(content.isDefault)}
            if(!this.addressInfo)
            {
                user_detail_post(obj).then(result=>{
                if(result.data.code==-6)
                    this.$router.push({path:'/login_register'})
                if(result.data.code==1)
                {
                    this.$toast.success('添加成功')
                    obj.id=parseInt(result.data.data[0]['LAST_INSERT_ID()'])
                    this.$store.commit('add_user_detail',obj)
                    this.$router.push({path:'/index'})  
                }})
            }
            else
            {
                obj.id=this.addressInfo.id
                this.axios.put('/user_detail',querystring.stringify(obj)).
                then(res=>
                {
                    if(res.data.code==0)
                    {
                        this.$toast.error('修改失败')
                    }
                    else 
                    {
                        this.$store.commit('add_user_detail',obj)
                        this.$toast.success('修改成功')
                    }
                })
                
                this.$router.push({path:'/index'})  
            }
        },
    }
}
</script>
<style lang="scss">
.addcity
{
    .van-button.van-button--danger.van-button--normal.van-button--block.van-button--round
    {
        background: #00bfa5;
        border:1px solid #00bfa5;
        border-radius: 4px;
    }
    .van-switch--on
    {
        background: #00bfa5;
    }
}
</style>