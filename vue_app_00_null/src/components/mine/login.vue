<template>
      <div class="login">
        <div class="title">
          <h2>登陆</h2>
        </div>
        <mu-container>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">

                <mu-form-item label="用户名" prop="username" :rules="usernameRules">
                    <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                </mu-form-item>

                <mu-form-item class="upwd" label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>

                 <mu-form-item >
                     <div class="other">
                        <span @click="forget">忘记密码</span><span @click="register">注册</span>
                     </div>
                </mu-form-item>

                <mu-form-item>
                  <div class="submit" @click="submit">
                      立即登录
                  </div>
                </mu-form-item>
            </mu-form>
        </mu-container>
      </div>
</template>
<script>
import {user_login} from "../../assets/js/user_login.js"
import {user_detail_get} from "../../assets/js/user_detail_get.js"
export default {
  data () {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
      ],
      validateForm: {
        username: '',
        password: '',
      },
    }
  },
  methods: {

    submit () {
      this.$refs.form.validate().then((result) => {
          if(result)
          {
            user_login(this.validateForm.username,this.validateForm.password).then(result=>{
              if(result.data.code==0)
              {
                this.$toast.info('用户名不存在')
              }
              else if(result.data.code==-1)
              {
                this.$toast.info('用户名或密码错误')
              }
              else
              {
                sessionStorage.clear()
                sessionStorage.setItem('uid',result.data.uid)
                sessionStorage.setItem('user_name',result.data.data[0].uname)
                sessionStorage.setItem('img',result.data.data[0].img)
                this.$toast.success('登录成功')
                user_detail_get(result.data.data[0].uid).then(res=>{
                  if(res.data.code==0)
                  {
                    
                    this.$store.commit('clear')
                    this.$router.push({path:'/index'})
                  }
                  else
                  {
                    this.$store.commit('clear')
                    this.$store.commit('set_user_detail',res.data.data)
                    this.$router.push({path:'/index'})
                  }
                }) 
              }
            })
          }
      });
    },
    register()
    {
        this.$emit('login_over',2)
    },
    forget()
    {
        this.$emit('login_over',3)
    }
  }
}
</script>
<style lang="scss" scoped>
    .login
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
          .upwd
          {
            margin-bottom: 0.2rem;
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
          .other
          {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
        }
    }
</style>