<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <!-- <AppAside /> -->
      <app-aside class="aside-menu" />
    </el-aside>
  <el-container>
    <el-header class="header">
      <div >
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客技术有限公司</span>
      </div>
      <el-dropdown>
        <div class="avatar-wrap">
          <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2183936484,1791894406&fm=26&gp=0.jpg" alt="">
          <span>用户昵称</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main class="main">首页</el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: '',
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.aside {
  background-color: #aaa;
  .aside-menu{
    height: 100%;
  }
}
.header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #aaa;
  .avatar-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
.main {
  background-color: aqua;
}
</style>
