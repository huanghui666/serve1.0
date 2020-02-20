<template>
  <div class="search">
    <topball></topball>
    <h4>-- 搜索商家 --</h4>
    <div class="productProfiles_list">
        <productProfiles  v-for="(item,index) of this.$route.query.data" :key=index :item=item class="productProfiles"></productProfiles>
    </div>
  </div>
</template>

<script>

import productProfiles from './product_profiles'
import topball from '../public/topBall'

export default {
    components:{productProfiles,topball},
    created()
    {
        if(!this.$route.query.data)
        {
            this.$router.push({name:'index'})
        }
    }
}
</script>
 
<style lang="scss" scoped>
.search
{
    h4
    {
        text-align: center;
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
