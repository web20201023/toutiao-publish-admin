<template>
  <el-menu
    default-active="2"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse">
    <div class="images">
    </div>
    <el-menu-item index="/">
      <i class="el-icon-setting"></i>
      <span slot="title">导航一</span>
    </el-menu-item>
    <el-menu-item index="aritical">
      <i class="el-icon-menu"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="image">
      <i class="el-icon-document"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="publish">
      <i class="el-icon-setting"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="comment">
      <i class="el-icon-setting"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="fans">
      <i class="el-icon-setting"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="setting">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: '',
  props: ['is-collapse'],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
// .images{
//   background: url('./login/login_index.png') no-repeat;
// }
</style>
