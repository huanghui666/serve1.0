<template>
      <div class="forget">
        <div class="title">
          <h2>找回密码</h2>
        </div>
        <mu-container>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">

              <div v-if="!isright">
                <mu-form-item label="用户名" help-text="" prop="username" :rules="usernameRules">
                    <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                </mu-form-item>

                <mu-form-item class="text" label="手机号" prop="phone" :rules="phoneRules">
                    <mu-text-field v-model="validateForm.phone" prop="phone"></mu-text-field>
                </mu-form-item>

                <mu-form-item>
                  <div class="submit" @click="submit">
                      立即修改
                  </div>
                </mu-form-item>
              </div>
                
              <div v-else>
                <mu-form-item label="新密码" help-text="" prop="password" :rules="passwordRules">
                    <mu-text-field v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>

                <mu-form-item class="text" label="确认新密码" prop="ex_password" :rules="ex_passwordRules">
                    <mu-text-field v-model="validateForm.ex_password" prop="ex_password"></mu-text-field>
                </mu-form-item>

                <mu-form-item>
                  <div class="submit" @click="submit2">
                      立即修改
                  </div>
                </mu-form-item>
              </div>


            </mu-form>
        </mu-container>
      </div>
</template>
<script>
import {user_get} from "../../assets/js/user_get.js"
import {user_update} from "../../assets/js/user_update.js"
export default {
  data () {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
      ],
      phoneRules: [
        { validate: (val) => !!val, message: '必须填写手机号'},
        { validate: (val) =>/^1[3456789]\d{9}$/.test(val),message:'手机号格式有误'},
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      ex_passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => this.validateForm.password===val, message: '两次密码需一致'}
      ],
      validateForm: {
        username: '',
        password: '',
        ex_password:'',
        phone:''
      },
      isright:0
    }
  },

  methods: {
    submit () {
      this.$refs.form.validate().then((result) => 
      {
        if(result)
        {
            user_get(this.validateForm.username).then(result=>{
            if(result.data.code==0)
              this.$toast.info('此用户不存在')
            else  
            {
              if(result.data.data[0].phone==this.validateForm.phone)
              {
                this.$toast.success('验证成功开始修改')
                this.isright=1
              }
              else
              {
                this.$toast.info('手机号与用户不匹配')
              }
            }
        })    
        }
      });
    },
    submit2 () {
      this.$refs.form.validate().then((result) => 
      {
        if(result)
        {
          user_update(this.validateForm.password,'upwd',this.validateForm.username).then(result=>{
            if(result.data.code==1)
            {
              this.$toast.success('修改成功')
              this.$emit('registerover',1)
            }
          })
        }
      });
    },
  }
}
</script>
<style lang="scss" scoped>
    .forget
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