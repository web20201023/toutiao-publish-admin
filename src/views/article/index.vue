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
            <el-radio-group v-model="form.resource">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="带审核"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核失败"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="form.date1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">筛选</el-button>
          </el-form-item>
        </el-form>
        <!-- 表单结束 -->
      </div>
    </el-card>
    <!-- 卡片结束 -->
    <!-- 卡片开始 -->
    <el-card class="box-card">
      <div class="text item">
        <!-- 列表开始 -->
        <el-table
          size="small"
          :data="tableData"
          style="width: 100%"
          class="article-table">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
    <!-- 列表结束 -->
    <!-- 分页开始 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
    <!-- 分页结束 -->
      </div>
    </el-card>
    <!-- 卡片结束 -->
  </div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  components: '',
  props: '',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
  .box-card1{
    margin-bottom: 25px;
  }
  .article-table{
    margin-bottom: 20px;
  }
</style>
