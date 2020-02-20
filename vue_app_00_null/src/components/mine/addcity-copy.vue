<template>
    <div class="addcity">
        <topball :title="'添加收货'"></topball>
        <div class="containerr">
            <span>联系人</span>
            <span><van-field @blur="checknull('uname')" v-model="uname" placeholder="请输入联系人姓名" /></span>
        </div>
        <div style="position:relative;height:2rem">
            <div class="is" v-if="uname_null">此项为必填项</div>
        </div>
          

        <div class="containerr">
            <span>电话</span>
            <span><van-field @blur="checknull('phone')" v-model="phone" placeholder="请输入电话" /></span>
        </div>
        <div style="position:relative;height:2rem">
            <div class="is" v-if="phone_null">此项为必填项</div>
            <div class="is" v-if="isphone">手机号格式有误</div>
        </div>

        <van-cell-group class="ex">
            <van-cell v-model="address" title="选择地区" value="" @click="show = true"></van-cell>
            <van-popup v-model="show" position="bottom">
            <van-area
                ref="area"
                value="110000"
                :area-list="areaList"
                @change="onChange"
                @confirm="show = false"
                @cancel="show = false"
            />
            </van-popup>
        </van-cell-group>
        <div style="position:relative;height:2rem">
            <div class="is" v-if="address_null">此项为必选项</div>
        </div>
        
        <div>
            </div>  
        <div class="containerr">
            <span>门牌号</span>
            <span><van-field @blur="checknull('address_detail')" v-model="address_detail" placeholder="请填写小区门牌号" style="color:#969799" /></span>
        </div>
        <div style="position:relative;height:2rem">
            <div class="is" v-if="address_detail_null">此项为必填项</div>
        </div>  
        

        <div class="sure" @click="submit">
            确认添加
        </div>
    </div>
</template>
<script>
    import areaList from '@/assets/json/areaList' // 引入
    import topball from '../public/topBall'
    import {user_detail_post} from "../../assets/js/user_detail_post"
    export default {
        data () {
            return {
                show: false,
                address:'省/市/区',
                phone:'',
                uname:'',
                address_detail: '',
                areaList:'',

                address_null:0,
                uname_null:0,
                phone_null:0,
                address_detail_null:0,

                isphone:''
            }
        },
        created()
        {
            this.areaList=areaList
        },
        components:{topball},
        methods: {
            onChange (picker, value, index) {
                let areaName = ''
                for (var i = 0; i < value.length; i++) {
                areaName = areaName + value[i].name + ' '
                }
                this.address = areaName
            },
            submit()
            {
                if(this.uname=='')
                {
                    this.checknull('uname')
                    return
                }
                else if(this.phone=='')
                {
                    this.checknull('phone')
                    return
                }
                else if(this.isphone==1)
                {
                    return
                }
                else if(this.address=='省/市/区')
                {
                    this.address_null=1
                    return
                } 
                else
                {
                    this.address_null=0
                    if(this.address=='')
                    {
                        this.address_detail_null=1
                        return
                    }
                    else
                    {
                        let obj = {get_user:this.uname,get_phone:this.phone,get_address:this.address,get_address_detail:this.address_detail}
                        user_detail_post(obj).then(result=>{
                        if(result.data.code==-6)
                            this.$router.push({path:'/login_register'})
                        if(result.data.code==1)
                        {
                            this.$toast.success('添加成功')
                            this.$store.commit('add_user_detail',obj)
                            this.$router.push({path:'/index'})
                        }})
                    }
                } 
            },
            checknull(sw)
            {
                switch (sw) {
                    case 'phone':
                        if(this.phone)
                        {
                            this.phone_null=0
                            if(/^1[3456789]\d{9}$/.test(this.phone))
                                this.isphone=0
                            else
                                this.isphone=1
                        }
                        else
                            this.phone_null=1
                        break;
                    case 'uname':
                        this.uname?this.uname_null=0:this.uname_null=1
                        break;
                    case 'address_detail':
                        this.address_detail?this.address_detail_null=0:this.address_detail_null=1
                        break;
                }
            },
        },
    }
</script>
<style lang="scss" scoped>
.ex
{
    margin-top: 1rem;
    padding:  10px 1rem;
}
.van-cell
{
    padding: 0;
}
.van-cell:not(:last-child)::after
{
    display: none;
}
.van-cell__value
{
    text-align: left;
    // padding: 10px 16px;
    color: #969799;

}
.van-field__control
{
        display: flex;
    flex-direction: column;
    align-items: center;
}
.demo-divider-form {
  padding: 0 16px;
}
.addcity
{
    margin: 0;
    padding: 0;
    .containerr
    {
        // height: 3rem;
        box-sizing: border-box;
        margin: 1rem 0 0 0;
        width: 100%;
        padding: 10px 1rem;
        background: white;
        // font-size: 1.1rem;
        letter-spacing: 1px;
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid rgb(246, 247, 248);
        span:nth-child(1)
        {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: #323233;
        }
        span:nth-child(2)
        {
            width: 50%;
            color: #969799 !important;
            text-align: right;
            input
            {
                width: 100%;
                text-align: right;
            }
        }
    }
    .sure
    {
        background: #00bfa5;
        padding: 10px 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin:2rem 0;
        color: white;
        font-size: 1.05rem;
        letter-spacing: 1px;
    }
}
</style>