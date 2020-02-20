<template>
  <div class="product_list">
      <div>
          <img style="object-fit:fill;" :src="item.img" alt="">
      </div>
      <div>
          <p>{{item.name}}</p>
          <p>{{item.detail}}</p>
          <div>
              <div class="caozuo">
                    <div class="reduce" @click='reduce' v-if="isshow">
                        <img src="../../assets/img/red.png" alt=""> 
                    </div>
                    <span class="count"> {{this.order.count==0?'':this.order.count}}</span>
                    <div class="add" @click='add'> 
                        <img src="../../assets/img/add.png" alt="">     
                    </div>
              </div>
              <span>￥{{item.price}}</span>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    props:['item'],
    data()
    {
        return{
            order:{
                id:'',
                name:'',
                price:'',
                count:0,
                img:''},
            isshow:0
        }
    },
    mounted()
    {
        this.order.id=this.item.id
        this.order.name = this.item.name
        this.order.price = this.item.price
        this.order.img = this.item.img
        let check =this.$store.state.order.findIndex((item)=>{
          return (item.name == this.order.name)
        });
        (check!=-1) ? (this.order.count=this.$store.state.order[check].count):(this.order.count=0)
        this.order.count&&(this.isshow = 1)
    },
    methods:{
        add()
        {
            this.order.count ++
            this.isshow = 1
        },
        reduce()
        {
            this.order.count --
            if(!this.order.count)
                this.isshow =0
        }
    },
    watch:{
        'order.count':{
            handler:function(newVal,oldVal){
                let vuex_order = this.$store.state.order
                let isHas = vuex_order.filter((item)=>{ return item.name==this.order.name})
                if(isHas.length>0)
                {
                    if(newVal>0)
                        this.$store.commit('updOrder',this.order)
                    else
                        this.$store.commit('redOrder',this.order)
                }
                else
                {
                    if(newVal>0)
                        this.$store.commit('addOrder',this.order)
                }
    　　　  }
        }
    }
};
</script>
 
<style lang="scss" scoped>
.caozuo
{
    padding: 0;
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .count
    {
        padding: 0 0.5rem
    }
    .reduce
    {
        display: flex;
        align-items: center;
        justify-content: center;
        padding:0 !important;
    }
    .add
    {
        display: flex;
        align-items: center;
        justify-content: center;
        padding:0 !important;
    }
}

    .product_list
    {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        &>div:nth-child(1)
        {
            width: 40%;
            img
            {
                width: 100%;
            }
        }
        &>div:nth-child(2)
        {
            width: 60%;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            position: relative;
            // align-items: center;
            p
            {
                letter-spacing: 0;
                margin: 0;
                margin-left: 0.5rem;
            }
            div
            {
                letter-spacing: 0;
                margin: 0;
                padding-left: 0.5rem;
            }
            &>p:nth-child(1)
            {
                font-weight: bolder;
                font-size: 1rem;
                height: 1.2rem;
                line-height: 1.2rem;
                margin-bottom: 0.5rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            &>p:nth-child(2)
            {
                color: #999;
                font-size: 0.5rem;
                
            }
            &>div:nth-child(3)
            {
                color: rgb(255, 83, 57);
                font-size: 1rem;
                font-weight: bolder;
                position: absolute;
                bottom:0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                &>div:nth-child(2)
                {
                    font-size: 1.2rem;
                    height: 1.2rem;
                    width: 1.2rem;
                    background: #2396ff;
                    color: white;
                    border-radius: 50%;
                    line-height: 1rem;
                    display: flex;
                    justify-content: center;
                    padding: 0;
                    span
                    {
                        line-height: 1.2rem;
                    }
                }
            }
        }
    }
</style>
