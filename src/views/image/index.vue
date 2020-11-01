<template>
  <div class="image-container">
    <!-- 卡片开始 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑开始 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/image">素材管理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑结束 -->
       </div>
        <div class="image-btn">
           <!-- 单选框开始 -->
          <el-radio-group v-model="collect" size="small" @change="onCollectChange">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
           <!-- 单选框结束 -->
          <el-button type="success" @click="centerDialogVisible = true">添加素材</el-button>
        </div>
      <!-- 栅格布局开始 -->
      <el-row :gutter="20">
        <el-col class="image-img" :xs="20" :sm="12" :md="8" :lg="6" :xl="4" v-for="(image, i) in images" :key="i">
          <el-image
            style="width: 100%; height: 230px"
            :src="image.url"
            fit="cover">
          </el-image>
        </el-col>
      </el-row>
    </el-card>
    <!-- 卡片结束 -->
    <el-dialog
      :append-to-body="true"
      title="上传素材"
      :visible.sync="centerDialogVisible"
    >
      <el-upload
        v-if="centerDialogVisible"
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        :on-success="onUploadSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getIamge } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: '',
  props: '',
  data () {
    const user = JSON.parse(window.localStorage.getItem('this.user'))
    return {
      collect: false,
      images: [],
      centerDialogVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImage(false)
  },
  mounted () {},
  methods: {
    loadImage (collect = false) {
      getIamge({
        collect
      }).then(res => {
        // console.log(res)
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      this.loadImage(value)
    },
    onUploadSuccess () {
      this.centerDialogVisible = false
      this.loadImage(false)
    }
  }
}
</script>

<style scoped lang="less">
  .image-btn{
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  .image-img{
    padding: 10px;
  }
</style>
