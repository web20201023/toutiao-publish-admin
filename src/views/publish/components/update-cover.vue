<template>
  <div class="update-cover">
    <div class="cover-image-wrap"  @click="onUpdateCover">
      <img
        class="cover-image"
        ref="cover-image"
        alt=""
        :src="value"
      >
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材选择" name="first">
          <image-list
            :is-show-add="false"
            :is-show-active="false"
            isShowSelected
            ref="image-list"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" ref="file" @change="updataImage">
          <img ref="preview-image" style="width:130px" alt="">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePreview">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadIamge } from '@/api/image'
import ImageList from '@/components/image-list'
export default {
  name: 'UpdateCover',
  components: {
    ImageList
  },
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onUpdateCover () {
      this.dialogVisible = true
    },
    updataImage () {
      const file = this.$refs.file.files[0]
      const bloData = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = bloData
    },
    updatePreview () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择图片')
          return
        }
        const fn = new FormData()
        fn.append('image', file)
        uploadIamge(fn).then(res => {
          this.dialogVisible = false
          this.$refs['cover-image'].src = res.data.data.url
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        console.log(imageList)
        const selected = imageList.selected
        if (selected === null) {
          this.$message('请选择图片')
          return
        }
        this.dialogVisible = false
        this.$emit('input', imageList.images[selected].url)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cover-image-wrap{
  width: 150px;
  height: 130px;
  border: 1px dashed #000;
  margin-left: 10px;
  .cover-image{
    width: 150px;
    height: 130px;
  }
}
</style>
