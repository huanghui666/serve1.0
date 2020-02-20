<template>
<div class="user">
    <topball></topball>
    <dl>
        <dd >
            用户名
            <div @click="update('uname')">
                {{uname}}
                <i class="iconfont icon-arrow-right"></i>
            </div>
        </dd>
        <p>账号绑定</p> 
        <dd>
            手机
            <div @click="update('phone')">
                {{phone}}
                <i class="iconfont icon-arrow-right"></i>
            </div>
            
        </dd>
        <p>安全设置</p> 
        <dd >
            修改密码
            <div @click="update('upwd')">
                <i class="iconfont icon-arrow-right"></i>
            </div>
        </dd>
        <p></p>
        <dd @click="exit">
            退出登录
        </dd>
    </dl>
</div>
    
</template>
<script>
import topball from '../public/topBall'
import {user_get} from "../../assets/js/user_get.js"

export default {
    components:{topball},
    methods:{
        exit()
        {
            sessionStorage.clear()
            this.$store.commit('clear')
            this.$router.push({path:'/mine'})
        },
        update(item)
        {
            switch(item)
            {
                case 'uname':
                    this.$router.push({path:'/change',query:{witch:'uname'}})
                    break
                case 'phone':
                    this.$router.push({path:'/change',query:{witch:'phone'}})
                    break
                case 'upwd':
                    this.$router.push({path:'/change',query:{witch:'upwd'}})
                    break                
            }
        }
    },
    data()
    {
        return{
            phone:''
        }
    },
    created()
    {
        let uname = sessionStorage.getItem('user_name')
        user_get(uname).then(
        res=>
        {
            this.phone= res.data.data[0].phone
            this.phone =this.phone.toString().replace(this.phone.toString().substring(3,7), "****")
        })
    },
    computed:{
        uname()
        {
            let uname = sessionStorage.getItem('user_name')
            return uname
        }
    }
}
</script>
<style lang="scss" scoped>
.user
{
    p
    {
        margin: 0;
        padding: 0 1.5rem;
        font-size: 0.5rem;
        color: #999;
    }
    dd
    {
        padding: 0;
        margin: 0;
        height: 3rem;
        font-size: 0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 1.5rem;
        font-size: 0.9rem;
        background: white;
        font-weight: 500;
        letter-spacing: 1px;
        margin:1rem 0;
        div
        {
            width: 45%;
            display:flex;
            align-items: center;
            justify-content:flex-end;
            i
            {
                margin-left: 1rem;
            }
        }
    }
    dd:last-child
    {
        letter-spacing: 2px;
        margin-top: 2.5rem;
        height: 3.3rem;
        font-size: 1.1rem;
        font-weight: 500;
        color: #ff5339;
        justify-content: center;
    }
}
   
</style>