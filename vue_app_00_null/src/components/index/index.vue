<template>
  <div class="index">
        <div class="head_ball">
            <div @click=changecity>
                <i class="iconfont icon-map"></i>
                <h5>{{this.place}}</h5>
            </div>
            <div id="search">
                <div >
                    <p :class="!isshow?'select':''">
                        <!-- <i class="iconfont icon-search"></i> -->
                        <span @click="isshow2(1)" v-if="isshow" class="iconfont icon-search"></span>  
                        <span @click="isshow2(1)" v-if="isshow">搜索商家信息</span>
                        <input class="out1" v-model="value" ref="input" @blur='isshow2(0)' v-else placeholder="搜索商家信息" />
                        <span  v-if="!isshow" @click="search" class="iconfont icon-search out2"></span>  
                    </p>
                </div>
            </div>
        </div>

        <div class="title">
                <div class="div3"  @click="to(item.title)" v-for="(item,index) of tuijian" :key="index">
                    <div class="img_div">
                        <img class="img_style"  :src='"http://127.0.0.1:4001/"+item.img_url' alt="">
                    </div>
                    <p>{{item.title}}</p>
                </div>
        </div>

        <!-- <mu-carousel hide-indicators transition="fade"> -->
            <h4>--今日推荐--</h4>
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(image, index) in imageList" :key="index">
                    <img class="swrip_img" style="object-fit:fill;" height="120px" width="100%" v-lazy="image" />
                </van-swipe-item>
            </van-swipe>

        <h4>-- 附近商家 --</h4>
        <mu-paper :z-depth="1" class="demo-loadmore-wrap">
            <mu-container ref="container" class="demo-loadmore-content">
                <mu-load-more  :loading="loading" @load="load">
                    <mu-list>
                    <div class="productProfiles_list">
                        <productProfiles  v-for="(item,index) of productProfiles_list" :key=index :item=item class="productProfiles"></productProfiles>
                    </div>
                    </mu-list>
                </mu-load-more>
                <h4 v-if="over" class="over">-- 已经到底了 --</h4>
            </mu-container>
        </mu-paper>
        
  </div>
</template>

<script>

import productProfiles from './product_profiles'
import {product_search} from "../../assets/js/product_search"
export default {
    components:{productProfiles},
    data()
    {
        return{
            tuijian:
            [{img_url:'1.png',title:'速食快餐'},
            {img_url:'2.png',title:'甜品饮品'},
            {img_url:'3.png',title:'炸鸡炸串'},
            {img_url:'5.png',title:'汉堡披萨'},
            {img_url:'4.png',title:'包子粥店'},
            ],
            imageList:[require('../../assets/img/slider/1.png'),
                    require('../../assets/img/slider/2.png'),
                    require('../../assets/img/slider/3.png'),
                    require('../../assets/img/slider/4.png'),
                    ],
            productProfiles_list:[],
            place:'请选择配餐地点',
            city:'',
            isshow:1,
            start:0,
            loading: false,
            over:0,    
        }
    },
    methods:{
        search()
        {
            product_search(this.value,'preciseSearch',this.city).then(result=>{
            if(result.data.code==0)
            {
                this.$toast.info('暂时还没有小主所想种类的店铺呢~')
            }
                
            else
            {
                this.$router.push({name:'search',query:{data:result.data.data}})
            }
          })
        },
        to(item)
        {
            product_search(item,'typeSearch',this.city).then(result=>{
            if(result.data.code==0)
            
                this.$toast.info('暂时还没有小主所想种类的店铺呢~')
            else
            {
                this.$router.push({name:'search',query:{data:result.data.data}})
            }
            })
        },
        isshow2(item)
        {
            if(item==1)
            {
                this.isshow=0
                this.$nextTick(()=>{this.$refs.input.focus()})
            }
            else
                this.isshow=1
        },
        changecity()
        {
            this.$router.push({path:'/changecity'})
        },
        windowScroll()
        {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop 
            if(scrollTop>51)
            {
                search.style="position:fixed;top:0;z-index:5;padding:2rem 0"
            }
            else
            {
                search.style=""
            }
        },
        load () {
            this.loading = true;
            if(this.over)
            {
                this.loading=false
            }
            else
            {
                setTimeout(() => {
                this.loading = false;
                this.start+= 4;
                this.num += 10;
                this.product()
            }, 2000)
            }
        },
        product()
        {
            this.axios.get('product',{params:{city:this.city,start:this.start,count:4}})
            .then(result => {
                result.data.data.filter((ele)=>{
                    this.productProfiles_list.push(ele)
                })
                if(result.data.code==2)
                {
                    this.over=1
                    // .display=none
                }
            }).catch(function (err) {
                console.log(err);
            })
        }
    },
    created()
    {
        if(sessionStorage.getItem('uid'))
        {
            let default_place = this.$store.state.user_detail.filter(ele=>{
                return ele.isDefault==1})
            if(default_place.length>0)
            {
                this.place = default_place[0].addressDetail
                this.city= default_place[0].city
            }
            else
            {
                this.$router.push({path:'/changecity'})
                this.$toast.info('请选择配送地址')
            }
        }
        else
        {
            this.$router.push({path:'/login_register'})
        }
        this.product()
    },
    mounted() 
    {
        window.addEventListener('scroll', this.windowScroll)
    },
    destroyed () 
    {
        window.removeEventListener('scroll', this.windowScroll)
    }
};
</script>
 
<style lang="scss" scoped>
.index
{
    .swrip_img
{
    width: 100%;
    overflow: hidden;
    // object-fit:contain !important;
}
.over
{
    text-align: center;
}
.container
{
    padding: 0
}
.demo-loadmore-wrap {
  width: 100%;
//   max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
  .mu-appbar {
    width: 100%;
  }
}
::-webkit-scrollbar {display:none}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  
  -webkit-overflow-scrolling: touch;
}
.div3
{
    padding: 0.2rem
}
.out1
{
    width: 50%;
}
  .mu-carousel
  {
      height: 15rem;
  }
  .swipe
  {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img
    {
        width:100%;
        height: 100%;
        
    }
  }

#search>div>i
{
    font-size: 0.9rem;
}
#search>div>p
{
    color: #909399;
    font-size: 0.7rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.select
{
    display: flex;
    justify-content: space-between !important;
    padding: 0 1rem;
    align-items: center;
}
#search>div
{
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
}
#search
{
    background: rgb(0, 191, 165);
    width: 100%;
    display: flex;  
    justify-content: center;
    padding: 0.5rem 0;
}
#search input
{
    background:none;  
    outline:none;  
    border:none;
    font-size: 0.7rem;
    color: #909399;
    width: 90%;
}
.head_ball div:nth-child(1) i
{
    font-size: 1.4rem
}
.head_ball div
{   
    width: 85%;
    height: 2rem;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    color: white;
    letter-spacing: 1px
}
.iconfont .icon-map
{
    font-size: 16px;
    color: white;
}
h4
{
    text-align: center;
}
.mint-swipe-item
{
    overflow: hidden
}
.img_div
{
    // display: flex;
    // flex-direction: column !important;
    // align-items: center !important;
    // justify-content: center;
    margin-left: 25%;
}
.img_style
{
    width: 100%;
    margin-bottom: 5px;
    margin-left: 50%;
}
.title div
{
    width: 25%;
    display: inline-block;
    position: relative;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    /* padding: 0.5rem 3rem; */
    font-size: 0.8rem;
    color: #909399;
}
.title div p
{
    text-align: center;
}
.title
{
    margin: 1rem 0;
    /* display: flex;
    justify-content:flex-start;
    flex-wrap: wrap; */
}
.head_ball
{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 6rem;
    background: rgb(0, 191, 165)
}
.mint-swipe-items-wrap
{
    background: url('')
}
.productProfiles_list
{
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.productProfiles
{
    width: 48%;
    height: auto;
    overflow: hidden;
    margin-left: 1%;
    margin-right: 1%;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    padding-bottom:0.5rem;
    border-radius: 4px;
    margin-top: 0.5rem;
}
}

</style>
