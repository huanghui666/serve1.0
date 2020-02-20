<template>
<div class="changcity">
    <div class="topBall">
        <div class="head_ball">
            <div>
                <i class="mintui mintui-back"></i>
                <label class="back">返回</label>                                                                                     
            </div>
            <div class="title">
                <span>修改地址</span>
            </div>
            <div class="add">
                <span>新增地址</span>
            </div>
        </div>
    </div>
    <dl class="city">
        <dt>当前地址</dt>
        <dd>1</dd>
        <dt>收货地址</dt>
        <dd></dd>
    </dl>
</div>
</template>
<script>
export default {
    mounted()
    {
    }
};
</script>
 
<style lang="scss" scoped>
  .city
  {
    dt,dd
    {
        padding: 0;
        margin: 0;
        height: 3rem;
        font-size: 0.9rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding:0 1.5rem;
    }
    dd
    {
        font-size: 1rem;
        background: white;
        font-weight: bolder;
    }
  }
  .head_ball
  {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background: #0fe3cd;
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
