<template>
  <div class="comment-container">
    <!-- 卡片开始 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
         <!-- 面包屑开始 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/comment">评论管理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑结束 -->
      </div>
      <!-- 表格开始 -->
      <el-table
        class="table-list"
        :data="articles"
        border>
        <el-table-column
          fixed
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
        >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数"
        >
        </el-table-column>
        <el-table-column
          prop="comment_status"
          label="状态"
        >
          <template slot-scope="scope">
            {{scope.row.comment_status ? '正常' : '关闭'}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.statusDisable"
              @change="onStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格结束 -->
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        background
      />
    </el-card>
  </div>
</template>

<script>
import { getArticles, updateCommentStatus } from '@/api/article'
export default {
  name: 'AppComment',
  components: '',
  props: '',
  data () {
    return {
      currentPage4: 4,
      articles: [],
      totalCount: 0,
      pageSize: 10,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.loadArticles()
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    handleSizeChange () {
      this.loadArticles()
    },
    handleCurrentChange (page) {
      this.loadArticles(page)
    },
    loadArticles (page = 1) {
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        const result = res.data.data.results
        result.forEach(article => {
          article.statusDisable = false
        })
        this.articles = result
        this.totalCount = res.data.data.total_count
      })
    },

    onStatusChange (article) {
      article.statusDisable = true
      // 请求提交修改
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
        // console.log(res)
        article.statusDisable = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启文章评论状态' : '关闭文章评论状态'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .table-list{
    margin-bottom: 20px;
  }
</style>
