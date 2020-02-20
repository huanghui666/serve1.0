<template>
      <div class="register">
        <div class="title">
          <h2>注册</h2>
        </div>
        <mu-container>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                <mu-form-item label="用户名" help-text="" prop="username" :rules="usernameRules">
                    <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                </mu-form-item>

                <mu-form-item class="text" label="手机号" prop="phone" :rules="phoneRules">
                    <mu-text-field v-model="validateForm.phone" prop="phone"></mu-text-field>
                </mu-form-item>

                <mu-form-item class="upwd" label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>

                <mu-form-item class="upwd" label="确认密码" prop="ex_password" :rules="ex_passwordRules">
                    <mu-text-field type="password" v-model="validateForm.ex_password" prop="ex_password"></mu-text-field>
                </mu-form-item>

                 <mu-form-item prop="isAgree" :rules="argeeRules">
                    <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
                </mu-form-item>

                <mu-form-item>
                  <div class="submit" @click="submit">
                      立即注册
                  </div>
                </mu-form-item>
            </mu-form>
        </mu-container>
      </div>
</template>
<script>
import {user_post} from "../../assets/js/user_post.js"
import {user_get} from '../../assets/js/user_get';
export default {
  data () {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
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
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        username: '',
        password: '',
        ex_password:'',
        isAgree: false
      },
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
          if(result)
          {
            user_get(this.validateForm.username).then(result=>{
              if(result.data.code!==1)
              {
                let obj = {uname:this.validateForm.username,upwd:this.validateForm.password,phone:this.validateForm.phone}
                user_post(obj).then(result=>{
                  if(result.data.code==1)
                  {
                    this.$toast.success('注册成功')
                    this.$emit('registerover',1)
                  }
                  else
                  {
                    this.$toast.info('注册失败，请重新再试一次')
                  }
                })
              }
              else
              {
                this.$toast.info('该用户名已存在')
              }
            })
          }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
    .register
    {
        padding: 0;
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