<template>
  <div class="setting-container">
    <!-- 卡片开始 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
         <!-- 面包屑开始 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/setting">个人设置</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑结束 -->
      </div>
      <!-- 表单 -->
      <el-form :model="user" :rules="userRules" ref="publish-form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="id">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              {{ user.mobile }}
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="user.name">
                {{ user.name}}
              </el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input type="textarea" v-model="user.intro">
                {{ user.intro }}
              </el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              label="邮箱"
            >
              <el-input v-model="user.email">
                {{ user.email }}
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
              @click="submitUser"
              :loading="updateProfileLoading"
            >保存</el-button>
            </el-form-item>
          </el-col>
          <el-col :offset="5" :span="7">
            <div class="block">
              <label for="file">
                <el-avatar shape="square" style="cursor: pointer" :size="200" fit="cover" :src="user.photo"></el-avatar>
                <p style="margin-left: 55px; cursor: pointer">点击修改头像</p>
              </label>
                <!-- <p @change="$refs.file.click()">点击修改头像</p> -->
                <input type="file" hidden id="file" ref="file" @change="onFileChange">
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-dialog
      title="修改图片"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      :before-close="handleClose"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="preview-img-wrap">
        <img :src="previewImage" ref="preview-img" class="preview-img">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdateImage" :loading="updateImageLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserProfile,
  updateAvatarImage,
  updateUserProfile
} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus'
export default {
  name: 'AppSetting',
  components: '',
  props: '',
  data () {
    return {
      user: {
        id: null,
        name: '',
        mobile: '',
        intro: '',
        photo: '',
        email: ''
      },
      userRules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      previewImage: '',
      cropper: null,
      updateImageLoading: false,
      updateProfileLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    loadUser () {
      getUserProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    onFileChange () {
      const file = this.$refs.file
      const bloData = URL.createObjectURL(file.files[0])
      this.previewImage = bloData
      this.dialogVisible = true
      this.$refs.file.value = ''
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // Dialog 打开动画结束
    onDialogOpened () {
      const image = this.$refs['preview-img']
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none'

      // crop (event) {
        // console.log(event.detail.x)
        // console.log(event.detail.y)
        // console.log(event.detail.width)
        // console.log(event.detail.height)
        // console.log(event.detail.rotate)
        // console.log(event.detail.scaleX)
        // console.log(event.detail.scaleY)
      // }
      })
    },
    onDialogClosed () {
      // this.cropper.destroy()
    },
    onUpdateImage () {
      this.updateImageLoading = true
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const formData = new FormData()
        formData.append('photo', file/*, 'example.png' */)
        updateAvatarImage(formData).then(res => {
          this.dialogVisible = false
          this.user.photo = window.URL.createObjectURL(file)
          // this.user.photo = res.data.data.photo
          this.updateImageLoading = true
          this.$message({
            type: 'success',
            message: '头像更新成功'
          })
          globalBus.$emit('update-user', this.user)
        })
      })
    },
    submitUser () {
      this.$refs['publish-form'].validate((valid) => {
        if (!valid) {
          return
        }
        this.updateProfileLoading = true
        const { name, intro, email } = this.user
        updateUserProfile({
          name,
          intro,
          email
        }).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.updateProfileLoading = false
          globalBus.$emit('update-user', this.user)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .preview-img-wrap{
    .preview-img{
        display: block;
        max-width: 100%;
        height: 200px
      }
  }

</style>
