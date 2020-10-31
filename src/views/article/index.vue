<template>
  <div class="article-container">
    <!-- 卡片开始 -->
    <el-card class="box-card1">
      <div slot="header" class="clearfix">
        <!-- 面包屑开始 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/article">内容管理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑结束 -->
      </div>
      <div class="text item">
        <!-- 表单开始 -->
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">带审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="channelId" placeholder="请选择频道">
              <el-option
                label="全部"
                :value="null">
              </el-option>
              <el-option
                v-for="(channel,i) in channels"
                :key="i"
                :label="channel.name"
                :value="channel.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="rangDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadArticle(1)">筛选</el-button>
          </el-form-item>
        </el-form>
        <!-- 表单结束 -->
      </div>
    </el-card>
    <!-- 卡片结束 -->
    <!-- 卡片开始 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到{{totalCount}}条数据:
      </div>
        <!-- 列表开始 -->
        <el-table
          v-loading="loading"
          :data="articles"
          size="small"
          class="article-table"
          style="width: 100%"
          stripe>
          <el-table-column
            label="封面">
            <template slot-scope="scope">
              <img
                v-if="scope.row.cover.images[0]"
                class="article-cover"
                :src="scope.row.cover.images[0]"
                alt=""
                lazy>
                <!-- 图片组件 -->
                <!-- <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.cover.images[0]"
                  fit=" cover">
                </el-image> -->
              <img
                v-else
                class="article-cover"
                src="./no-cover.gif"
                alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态">
            <!-- 自定义表格列开始 -->
             <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="$router.push('./publish?id=' + scope.row.id.toString())"
                circle>
              </el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                :page-size.sync="page"
                @click="onDeleteArticle(scope.row.id)"
                circle>
              </el-button>
            </template>
            <!-- 自定义表格列结束 -->
          </el-table-column>
        </el-table>
    <!-- 列表结束 -->
    <!-- 分页开始 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="pageSize"
      :disabled="loading"
      @current-change="currentChange"
    >
    </el-pagination>
    <!-- 分页结束 -->
    </el-card>
    <!-- 卡片结束 -->
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: '',
  props: '',
  data () {
    return {
      form: {
        delivery: false,
        type: [],
        desc: ''
      },
      articles: [],
      articleStatus: [
        { text: '草稿', type: 'warning' },
        { text: '带审核', type: 'primary' },
        { text: '审核通过', type: 'success' },
        { text: '审核失败', type: 'info' },
        { text: '已删除', type: 'danger' }
      ],
      totalCount: 0,
      pageSize: 20,
      status: null,
      channels: {},
      channelId: null,
      rangDate: null,
      loading: true,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle(1)
    this.loadChannels()
  },

  mounted () {},
  methods: {
    loadArticle (page = 1) {
      this.loading = true
      getArticles({
        page,
        pre_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangDate ? this.rangDate[0] : null,
        end_pubdate: this.rangDate ? this.rangDate[1] : null
      }).then(res => {
        // console.log(res)
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
        this.loading = false
      })
    },
    // 修改前页
    currentChange (page) {
      this.loadArticle(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
        // console.log(this.channels)
      })
    },
    onDeleteArticle (articleId) {
      console.log(articleId.toString())
      this.$confirm('是否刪除?', '刪除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          // console.log(res)
          this.loadArticle(this.page)
        })
      }).catch(() => {})
      // console.log('onLogout')
    }
  }
}
</script>

<style scoped lang="less">
  .article-container{
    .box-card1{
      margin-bottom: 25px;
    }
    .article-table{
    margin-bottom: 20px;
    text-align: center;
    }
    .article-cover{
      width: 100px;
      background-size: convert;
    }
  }
</style>
