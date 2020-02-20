<template>
<div class="changecity">
    <div class="topBall">
        <div class="head_ball">
            <div @click="back">
                <i  class="mintui mintui-back"></i>
                <label class="back">返回</label>                                                                                     
            </div>
            <div v-if="title" class="title">
                <span>{{title}}</span>
            </div>
            <div v-if="button" class="button" @click="fatherMethod">
                {{button}}
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:{title:{default:''},button:{default:''},
            fatherMethod: {
            type: Function,
            default: null}},
    mounted()
    {
    },
    methods:
    {
        back()
        { 
            if(window.history.length>0)
                window.history.go(-1)
            else
            {
                this.$router.push({path:'/index'})
            }
                
        }
    }
};
</script>
 
<style lang="scss" scoped>
  .head_ball
  {
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background: #00bfa5;
    border-bottom: 0.5px solid #00b79e;
    &>div:nth-child(1)
    {
        position: absolute;
        left: 0;
        i
        {
        font-size: 14px;
        margin-left: 0.5rem;
        color: white;
        }
        .back
        {
        font-size: 14px;
        margin-left: 0.2rem;
        color: white;
        }
    }
    &>div:nth-child(2)
    {
        color: white;
        font-weight: bolder
    }
    &>div:nth-child(3)
    {
        color: white;
        position: absolute;
        right: 0;
        padding-right: 0.5rem;
    }
  }
</style>
