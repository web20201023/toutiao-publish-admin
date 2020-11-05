<template>
  <div class="image-list-container">
    <!-- 卡片开始 -->
    <el-card class="box-card">
      <div class="image-btn">
          <!-- 单选框开始 -->
        <el-radio-group v-model="collect" size="small" @change="loadImage(1)">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
          <!-- 单选框结束 -->
        <el-button
          type="success"
          @click="centerDialogVisible = true"
          v-if="isShowAdd"
        >添加素材</el-button>
      </div>
      <!-- 栅格布局开始 -->
      <el-row :gutter="20">
        <el-col class="image-wrap" :xs="20" :sm="12" :md="8" :lg="6" :xl="4" v-for="(image, index) in images" :key="index">
          <el-image
            class="image-item"
            :src="image.url"
            fit="cover"
            @click.native="selected = index"
          >
          </el-image>
          <div
            class="selected"
            v-show="isShowSelected && selected === index"
          ></div>
          <div class="image-item-btn" v-if="isShowActive">
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
  </div>
</template>

<script>
import { getIamge, collectImage, deleteImage } from '@/api/image'
export default {
  name: 'ImageList',
  components: '',
  props: {
    isShowAdd: {
      type: Boolean,
      default: true
    },
    isShowActive: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
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
      page: 1,
      selected: null
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
  .image-wrap{
    position: relative;
  }
  .image-item{
    width: 100%;
    height: 200px;
    margin-bottom:10px
  }
  .selected{
    background: url('./selected.png') no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100%;
  }
</style>
