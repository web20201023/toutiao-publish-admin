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
          <el-radio-group v-model="collect" size="small" @change="loadImage(1)">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
           <!-- 单选框结束 -->
          <el-button type="success" @click="centerDialogVisible = true">添加素材</el-button>
        </div>
      <!-- 栅格布局开始 -->
      <el-row :gutter="20">
        <el-col class="image-item" :xs="20" :sm="12" :md="8" :lg="6" :xl="4" v-for="(image, i) in images" :key="i">
          <el-image
            style="width: 100%; height: 230px"
            :src="image.url"
            fit="cover">
          </el-image>
          <div class="image-item-btn">
            <el-button
              size="mini"
              type="warning"
              :icon="image.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              circle
              @click="onCollect(image)"
              :loading="image.loading">
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="onDelete(image)"
              circle
              :loading="image.loading">
            </el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :current-page="page">
      </el-pagination>
    </el-card>
    <!-- 卡片结束 -->
    <el-dialog
      :append-to-body="true"
      title="上传素材"
      :visible.sync="centerDialogVisible"
      width="400px"
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
import { getIamge, collectImage, deleteImage } from '@/api/image'
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
      },
      totalCount: 0,
      pageSize: 12,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.loadImage(1, false)
  },
  methods: {
    loadImage (page) {
      this.page = page
      getIamge({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        // console.log(res)
        const result = res.data.data.results
        result.forEach(image => {
          image.loading = false
        })
        this.images = result
        this.totalCount = res.data.data.total_count
      })
    },
    onUploadSuccess () {
      this.centerDialogVisible = false
      this.loadImage(this.page)
      this.$messge({
        tpye: 'success',
        message: '上传成功'
      })
    },
    onCurrentChange (page) {
      this.loadImage(page)
    },
    onCollect (image) {
      image.loading = true
      collectImage(image.id, !image.is_collected).then(res => {
        image.is_collected = !image.is_collected
        image.loading = false
      })
    },
    onDelete (image) {
      image.loading = true
      this.$confirm('是否刪除?', '刪除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteImage(image.id).then(res => {
          this.loadImage(this.page)
          image.loading = false
        })
      }).catch(() => {})
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
  .image-item-btn{
    height: 70px;
    position: absolute;
    right: 10px;
    bottom: 5px;
    left: 10px;
    font-size: 25px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
  }
  .image-item{
    position: relative;
  }
</style>
