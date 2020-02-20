<template>
<div class="bottomBall">
    <div id="leftBall" class="leftBall">
        <ul id="ul" >
            <li :class="active==index ? 'bgwhite' : ''"  @click='change(item.lid-1)' :title="item.lid-1" v-for="(item,index) of leftdata" :key=index>{{item.name}}</li>
        </ul>
    </div>
    <div class="rightBall" >
        <dl id="dl">
            <ul :ref="index" :title="item.lid-1" v-for="(item,index) of leftdata" :key=index :item=item>
                <li>{{item.name}}</li>
                <li>
                    <productList v-for="(item2,index2) of rightdata.filter( item3 => item3.lid ==item.lid)" :key = index2 :item=item2>
                    </productList>
                </li>
            </ul>
        </dl>
     </div>
    <car v-if="shop_id" :start='start' :shop_id='shop_id' :old="old" :reduction='reduction' :title='title2'></car>
</div>
</template>

<script>
import productList from './product_list'
import car from './car'
export default {
    props:['leftdata','rightdata','old','reduction','start','title2'],
    data()
    {
        return{
            select:'',
            rightfengye:[],
            title:'',
            meta:[],
            active:'0',
            show:0,
            shop_id:0
        }
    },
    methods:{
        change(index)
        {
            
            this.active = index
            this.title = index
        },
        windowScroll()
        {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if(scrollTop>290)
            {
                ul.style.marginTop=scrollTop-290+'px'
            }
            else
            {
                ul.style=""
            }  
            this.check()
            //this.rightdata[0]['id']
        },
        getmeta()
        {
            let that =this
            for(let i in this.$refs)
            {
                this.meta.push(this.$refs[i][0].offsetTop)
            }  
        },
        check()
        {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if(scrollTop<Math.min.apply(null,this.meta))
            {
                this.show=0
                return 0
            }
            
            else if(scrollTop>Math.max.apply(null,this.meta))
            {
                this.show=this.meta.length
                return 0
            }
            else
            {
                for(let i =0;i<this.meta.length;i++)
                {
                    if(scrollTop<this.meta[i])
                    {
                        this.show = i
                        break
                    }
                }
            }
           
        }
    },
    mounted()
    {
        this.shop_id = this.rightdata[0]['id']
        window.addEventListener('scroll', this.windowScroll)
        this.getmeta()
    },
    destroyed () 
    {
        window.removeEventListener('scroll', this.windowScroll)
    },
    components:{productList,car},
    watch:{
    　　title:{
    　　　　handler:function(newVal,oldVal){
            setTimeout(()=>{
                dl.childNodes.forEach(e=>{
                    if(e.title==newVal)
                    {   
                        window.scrollTo({ 
                                            top: e.offsetTop, 
                                            behavior: "smooth" 
                                        })
                    }
                })
            },100)
    　　　　},
    　　　　deep:true
    　　},
        show:{
            handler:function(newVal,oldVal)
            {
                this.active = newVal
            },
            deep:true
        }
}
};
</script>
 
<style lang="scss" scoped>
.bgwhite
{
    background: white !important;
}
.leftBall
{
    width: 30%;
    ul
    {
        margin: 0;
        padding: 0;
        list-style: none;
        li
        {
            padding: 1rem 0.5rem;
            height: 3rem;
            text-align: center;
            color: #666;
            background: #f8f8f8;
        }
    }
}

.rightBall
{
    ul,li
    {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    padding:0 1rem;
    width: 70%;
    background: white;
    ul
    {
        font-weight: 700;
    }
    li
    {
        padding: 0;
        margin: 0;
    }
}

.bottomBall
{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>
