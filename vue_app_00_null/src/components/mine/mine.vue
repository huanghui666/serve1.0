<template>
<div class="mine">
    <div class="topball">
        <div>
            <div class="flex">
                <div class="circle2" v-if="!isshow"></div>
                <van-uploader :class="isshow?'isshow':''" :after-read="afterRead" />
                <div class="circle " @click="sumbit2" :style="{backgroundImage:'url(' + img + ')'}" alt="">
                    <!-- <i class="van-icon van-icon-plus van-uploader__upload-icon"></i> -->
                </div>
                <div v-if="isdenglu" class="msg" @click='goto("user")'>{{uname}}</div>
                <div v-else class="msg dldl" @click="goto('login')">登录/注册</div>
            </div>
            <i class="iconfont icon-arrow-right" @click='goto("user")'></i>
        </div>
    </div>  
    
    <div class="bottomball">
        <dl>
            <dd @click='goto("changecity")'>设置地址 <i class="iconfont icon-arrow-right"></i></dd>
            <dd @click='goto("user")'>账户信息 <i class="iconfont icon-arrow-right"></i></dd>
            <dd @click='goto("order")'>我的订单 <i class="iconfont icon-arrow-right"></i></dd>
        </dl>
    </div>
</div>
</template>
<script>
import qs from 'querystring'
export default {
    data () {
        return {
            isdenglu:'',
            uname:'',
            isshow:1
        }
    },
    methods:{
        goto(item)
        {
            if(sessionStorage.getItem('uid'))
            {
                switch(item)
                {
                    case 'changecity':
                    {
                        this.$router.push({path:'/changecity'})
                        break
                    }
                    case 'user':
                    {
                        this.$router.push({path:'/user'})
                        break
                    }
                    case 'login':
                    {
                        this.$router.push({path:'/login_register'})
                        break
                    }
                    case 'order':
                    {
                        this.$router.push({path:'/order'})
                        break
                    }
                }
            }
            else
            {
                this.$router.push({path:'/login_register'})
            }
            
        },
        uploadFile(file)
        {
            let fd = new FormData()
            fd.append('head',file)
            // console.log(fd.get('user_head'));
            this.axios.post('upload',qs.stringify({file:file,uid:sessionStorage.getItem('uid')})).then(res=>
                {
                    
                    if(res.data.code==0)
                        this.$toast.info('图片尺寸过大,请重新选择')
                    else
                    {
                        sessionStorage.setItem('img',res.data.data)
                        this.$router.go(0)
                    }
                        
                }
            ).catch(err=>{
                this.$toast.info('图片尺寸过大,请重新选择')
            })
        }
        ,
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            this.uploadFile(file.content);
        },
        sumbit2()
        {
            document.querySelector('.van-uploader__input').click()
        }
    },
    mounted()
    {

        if(sessionStorage.getItem('uid'))
        {
            this.isdenglu=1
            this.uname=sessionStorage.getItem('user_name')
        }
        else
        {
            this.isdenglu=0
        }
        if(this.img)
            this.isshow=1
        else
            this.isshow=0
    },
    computed:
    {
        img:()=>{
            return sessionStorage.getItem('img')
        }
    }
};
</script>
 
<style lang="scss">
.mine
{
    .isshow
    {
        opacity: 0;
    }
    // .isshow i
    // {
    //     display: none;
    // }
    .van-uploader__upload
    {
        z-index: 2;
        border-radius: 50%;
    }
    i
    {
        color: #8e8e93;
    }
    .topball
    {
        height: 7rem;
        background: rgb(0, 191, 165);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        letter-spacing: 1px;
        &>div 
        {
            width: 100%;
            height: 5rem;
            display: flex;
            justify-content: space-between;
            padding: 0 1.5rem;
            i
            {
                font-size: 1rem;
                line-height: 1rem;
                display: flex;
                justify-content: center;
                flex-direction: column;
            }
            .flex
            {
                display: flex;
                // width: 50%;
                flex-wrap: nowrap;
                .circle
                {
                    position: absolute;
                    display: inline-block;
                    height: 5rem;
                    width: 5rem;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-position: center center;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                .circle2
                {
                    position: absolute;
                    display: inline-block;
                    height: 5rem;
                    width: 5rem;
                    background: white;
                    border-radius: 50%;
                    z-index: 3;
                }
                .msg
                {
                    // position: relative;
                    // left: -2.5rem;
                    color: white;
                    font-size: 1.1rem;
                    font-weight: bolder;
                    margin-left: 1.5rem;
                    margin-top: 0.4rem;
                    overflow: auto;
                    // align-self: flex-start;
                    // height: 100%;
                    // display: flex;
                    // flex-direction: column;
                    // justify-content: center;
                }
                .msg.dldl
                {
                    margin-top: 1.4rem;
                }
            }

        }

    }
    .bottomball
    {
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
        }
    }
}

</style>
