<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <!-- <AppAside /> -->
      <app-aside class="aside-menu" :is-collapse="isCollapse"/>
    </el-aside>
  <el-container>
    <el-header class="header">
      <div >
        <i
          :class="{
            'el-icon-s-fold': !isCollapse,
            'el-icon-s-unfold': isCollapse
          }"
        @click="isCollapse = !isCollapse"></i>
        <span>江苏传智播客技术有限公司</span>
      </div>
      <el-dropdown>
        <div class="avatar-wrap">
          <img :src="user.photo" alt="">
          <span>{{ user.name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
             <router-link to='/setting' style="text-decoration: none">设置</router-link>
            </el-dropdown-item>
          <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
import globalBus from '@/utils/global-bus'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: '',
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    globalBus.$on('update-user', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('是否退出登录?', '退出登录提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('this.user')
        this.$router.push('/login')
      }).catch(() => {})
      // console.log('onLogout')
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
.main {}
</style>
