<template>
  <div class="publish-container">
    <!-- 卡片开始 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑开始 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/publish">{{$route.query.id ? '内容修改' : '内容发布'}}</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑结束 -->
      </div>
      <div class="text item">
        <!-- 表单开始 -->
        <el-form :model="article" ref="ruleForm" label-width="100px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model="article.content"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio label="1">单图</el-radio>
              <el-radio label="3">三图</el-radio>
              <el-radio label="0">无图</el-radio>
              <el-radio label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
              v-for="(channel, i) in channels"
              :key="i"
              :value="channel.id"
              :label="channel.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onPublish(false)">{{$route.query.id ? '修改' : '发表'}}</el-button>
            <el-button @click="onPublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
        <!-- 表单结束 -->
      </div>
    </el-card>
    <!-- 卡片结束 -->
  </div>
</template>

<script>
import { getArticleChannels, addArticle, getArticle, changeArticle } from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      channels: [],
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res.data.data.channels)
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      const articleId = this.$route.query.id
      if (articleId) {
        changeArticle(articleId, this.article, draft).then(res => {
          this.$message({
            message: `${draft ? '发布成功' : '保存成功'}`,
            type: 'success'
          })
          this.$router.push('./article')
        })
      } else {
        addArticle(this.article, draft).then(res => {
          // console.log(res)
          this.$message({
            message: `${draft ? '发布成功' : '保存成功'}`,
            type: 'success'
          })
        })
      }
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        // console.log(res)
        this.article = res.data.data
        // console.log(this.article)
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
