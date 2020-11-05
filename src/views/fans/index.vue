<template>
  <div class="fans-container">
    <div id="main" ref="main" style="width: 800px;height:600px;"></div>
    <h2>地图图表示例</h2>
    <map-demo />

    <h2>纯粹的百度地图示例</h2>
    <bmap-demo />
  </div>
</template>

<script>
import echarts from 'echarts'
import MapDemo from './components/map-demo'
import BmapDemo from './components/bmap-demo'
export default {
  name: 'FansIndex',
  components: {
    MapDemo,
    BmapDemo
  },
  props: '',
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    var myChart = echarts.init(this.$refs.main)
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    myChart.setOption(option)
  },
  methods: {}
}
</script>

<style scoped lang='less'>

</style>
