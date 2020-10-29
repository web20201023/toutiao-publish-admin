<template>
  <div class="login-container">
    <div class="login-head"></div>
    <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
        class="login-btn"
        type="primary"
        @click="onLogin"
        :loading="loginLoading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loginLoading: false,
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选同意阅读协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  counted () {},
  methods: {
    onLogin () {
      // 获取表单验证
      // const user = this.user

      // 表单验证
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      // 开启登录中loading...
      this.loginLoading = true

      // 发送请求
      login(this.user).then(res => {
        // console.log(res)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginLoading = false
        // 跳转到首页
        // this.$router.push('/')
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('用户名或密码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>
<style scoped lang="less">
  .login-container{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;
  }
  .login-head{
    width: 115px;
    height: 57px;
    background: url("./logo_index.png") no-repeat;
    position: absolute;
    top: 153px;
  }
  .login-form{
    background-color: #fff;
    padding: 50px;
    padding-top: 80px;
    min-width: 300px;
    .login-btn {
      width: 100%;
    }
  }
</style>
