<template>
  <div class="setting-container">
    <!-- 卡片开始 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
         <!-- 面包屑开始 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/setting">个人设置</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑结束 -->
      </div>
      <!-- 表单 -->
      <el-form :model="user" label-width="100px" size="medium">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="id">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              {{ user.mobile }}
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="user.name">
                {{ user.name}}
              </el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input type="textarea" v-model="user.intro">
                {{ user.intro }}
              </el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              label="邮箱"
            >
              <el-input v-model="user.email">
                {{ user.email }}
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">立即创建</el-button>
            </el-form-item>
          </el-col>
          <el-col :offset="5" :span="5">
            <div class="block">
              <label for="file">
                <el-avatar shape="square" style="cursor: pointer" :size="200" fit="cover" src="http://toutiao-img.itheima.net/Frndv_jp5V63_zYwGt98dyvaHRQ2"></el-avatar>
                <p style="margin-left: 50px; cursor: pointer">修改头像</p>
              </label>
                <input type="file" hidden id="file">
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'AppSetting',
  components: '',
  props: '',
  data () {
    return {
      user: {
        id: null,
        name: '',
        mobile: '',
        intro: '',
        photo: '',
        email: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.loadUser()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    loadUser () {
      getUserProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
