<template>
<div class="changeuname">
    <div class="title">
        <h2>修改用户名</h2>
    </div>
    <mu-container>
        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
            <div>
                <mu-form-item label="新用户名" help-text="" prop="uname" :rules="usernameRules">
                    <mu-text-field v-model="validateForm.uname" prop="uname"></mu-text-field>
                </mu-form-item>

                <mu-form-item>
                    <div class="submit" @click="submit">
                        立即修改
                    </div>
                </mu-form-item>
            </div>
        </mu-form>
    </mu-container>
</div>

</template>
<script>
import {user_update} from "../../assets/js/user_update.js"
export default {
  data () {
    return {
            usernameRules: [
                { validate: (val) => !!val, message: '必须填写用户名'},
                { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
            ],
            validateForm: 
            {
               uname:''
            },
    }
  },
  methods: {
        submit() {
            this.$refs.form.validate().then((result) => 
            {
                if(result)
                {
                    user_update(this.validateForm.uname,'uname',sessionStorage.getItem('user_name')).then(result=>{
                        if(result.data.code==1)
                        {
                            this.$toast.success('修改成功')
                            sessionStorage.setItem('user_name',this.validateForm.uname)
                            this.$router.push({name:'index'})
                        }
                    })
                }
            });
        },
  }
}
</script>
<style lang="scss" scoped>
.changeuname
    {
        position: absolute;
        width: 80% !important;
        margin: 0 10%;
        .title  
        {
          width: 100%;
          display: flex;
          align-items: center;
          height:5rem;
          border-bottom: 1px solid #f1f1f1;
          margin-bottom: 1rem;
          h2
          {
            font-size: 1.5rem;
          }
        }
        &>div:nth-child(2)
        {
          padding: 0; 
        }
        .submit
        {
          font-size: 1.2rem;
          line-height: 3rem;
          height: 3rem;
          width: 100%;
          text-align: center;
          color: rgba(0,0,0,.54);
          background: #f1f1f1;
          border-radius: 4px;
          margin: 0.3rem 0;
        }
    }
</style>