<template>
    <div class="find_list">
        <mu-container>
          <mu-flex justify-content="center">
            <mu-paper :z-depth="1">
              <mu-grid-list class="gridlist-demo">
                <mu-grid-tile @click="go(index)" v-for="(tile,index) of list" :key="index">
                  <img :src="tile.image" >
                  <span slot="title">{{tile.title}}</span>
                  <span slot="subTitle">by <b>{{tile.author}}</b></span>
                </mu-grid-tile>
              </mu-grid-list>
            </mu-paper>
          </mu-flex>
        </mu-container>
    </div>
</template>
<script>
import {product_search} from "../../assets/js/product_search"
export default {
    props:['active','city'],
    data()
    {
        return{
                value:'',
                list:[],
        }
    },
    methods:{
        go(item)
        {
            this.$router.push({
            name: 'find_detail',
            params: {
                list:this.list[item]
            }
        })
        },
        change()
        {
            switch(this.active)
            {
                case 0:
                    this.value='速食快餐'
                    break   
                case 1:
                    this.value='甜品饮品'
                    break
                case 2:
                    this.value='炸鸡炸串'
                    break
                case 3:
                    this.value='汉堡披萨'
                    break
                case 4:
                    this.value='包子粥店'
                    break
            }
            this.list=[]
            product_search(this.value,'typeSearch',this.city).then(result=>{
            if(result.data.code==0)
            {
                this.$toast.info('暂时还没有小主所想种类的店铺呢~')
            }
            else
            {
                let list = result.data.data.filter(ele=>{return ele.haspage==1}).map(ele=>{return ele.id})
                if(list.length>0)
                {
                  this.axios.get('page',{params:{list}}).then(res=>{
                      res.data.data.forEach(element => {
                          this.list.push({
                              "id":element.id,
                              "title":element.title,
                              "author":element.author,
                              "page":element.page,
                              "image":element.image,
                              "about":element.about,
                              "se_title":element.se_title,
                              "author_img":element.author_img,
                              "title2":element.title2,
                              "se_title2":element.se_title2,
                          })
                      });
                  })
                }
                else
                {
                  this.$toast.info('暂时还没有小主所想种类的店铺呢~')
                  this.list=[]
                }
            }
            })
        }
    },
    created()
    {
       this.change()
    },
    watch:
    {
        active()
        {
           this.change()
        }
    }
};
</script>
<style lang="scss" scoped>
.mu-grid-list
{
  padding: 0.25rem
}
#title
{
    box-shadow: 0px 5px 30px #f9f9f9;
}
  .fixed
  {
    position:fixed;
    top:0;
    z-index:5;
    background: #f9f9f9 !important;
  }
  .container
  {
    padding-left: 0;
    padding-right: 0;
  }
  .mu-grid-tile>img
  {
    width: 100%;
  }
  .head_ball
  {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 3rem;
    background: #0fe3cd;
    i
    {
      font-size: 14px;
      margin-left: 0.5rem;
      color: white
    }
    .back
    {
      font-size: 14px;
      margin-left: 0.2rem;
      color: white
    }
  }
  .mu-tabs
  {
      overflow: hidden;
      overflow-x: auto;
      white-space:nowrap;
  }
</style>