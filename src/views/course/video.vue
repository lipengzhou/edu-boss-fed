<template>
  <div class="course-video">
    <el-card>
      <div slot="header">
        <span>课程：xxx</span>
        <br>
        <span>阶段：xxx</span>
        <br>
        <span>课时：xxx</span>
      </div>
      <el-form label-width="70px">
        <el-form-item label="视频上传">
          <input ref="video-file" type="file">
        </el-form-item>
        <el-form-item label="封面上传">
          <input ref="image-file" type="file">
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleUpload"
          >开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item>
          <p>视频上传中：{{ uploadPercent }}%</p>
          <p
            v-if="isUploadSucess"
          >视频转码中：{{ isTransCodeSuccess ? '完成' : '正在处理，请稍后' }}</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getAliyunImagUploadAddressAdnAuth,
  getAliyunVideoUploadAddressAdnAuth,
  aliyunTransCode,
  getAliyunTransCodePercent
} from '@/services/aliyun-upload'

export default Vue.extend({
  name: 'CourseVideo',
  data () {
    return {
      uploader: null,
      imageURL: '',
      videoId: null,
      uploadPercent: 0,
      isUploadSucess: false,
      isTransCodeSuccess: false
    }
  },
  computed: {
    video () {
      return this.$refs['video-file']
    },
    image () {
      return this.$refs['image-file']
    }
  },
  created () {
    this.initUploader()
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
        userId: '1618139964448548',
        // 上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
        region: '',
        // 分片大小默认1M，不能小于100K
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          console.log('onUploadstarted', uploadInfo)

          // 1. 通过我们的后端获取文件上传凭证
          let uploadAddressAndAuth
          if (uploadInfo.isImage) {
            // 获取图片上传凭证
            const { data } = await getAliyunImagUploadAddressAdnAuth()
            uploadAddressAndAuth = data.data
            this.imageURL = data.data.imageURL
          } else {
            // 获取视频上传凭证
            const { data } = await getAliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageURL // 请确保一定是先上传图片
            })
            uploadAddressAndAuth = data.data
            this.videoId = uploadAddressAndAuth.videoId
          }

          // 2. 调用 uploader.setUploadAuthAndAddress 设置上传凭证
          ;(this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )

          // 3. 设置好上传凭证确认没有问题，上传进度开始

          // setUploadAuthAndAddress(uploadFileInfo, uploadAuth, uploadAddress,videoId);
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          console.log('onUploadSucceed', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.log('onUploadFailed', uploadInfo, code, message)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
          console.log('onUploadProgress', uploadInfo, totalSize, loadedPercent)
          console.log('loadedPercent', loadedPercent)
          if (!uploadInfo.isImage) {
            this.uploadPercent = Math.floor(loadedPercent * 100)
          }
        },
        // 上传凭证超时
        // onUploadTokenExpired: function (uploadInfo: any) {
        //   console.log('onUploadTokenExpired', 'uploadInfo')
        // },
        // 全部文件上传结束
        onUploadEnd: async () => {
          this.isUploadSucess = true
          // 请求转码
          const { data } = await aliyunTransCode({
            lessonId: this.$route.query.lessonId,
            coverImageUrl: this.imageURL,
            fileName: (this.video as any).files[0].name,
            fileId: this.videoId
          })

          console.log(data)

          // 轮询查询转码进度
          const timer = setInterval(async () => {
            const { data } = await getAliyunTransCodePercent(this.$route.query.lessonId)
            console.log(data.data)
            if (data.data === 100) {
              this.isTransCodeSuccess = true
              window.clearInterval(timer)
              console.log('转码成功')
            }
          }, 3000)
        }
      })
    },

    handleUpload () {
      // 初始化上传状态
      this.isUploadSucess = false
      this.isTransCodeSuccess = false
      this.uploadPercent = 0

      // 获取上传的文件
      const videoFile = (this.video as any).files[0]
      const imageFile = (this.image as any).files[0]
      const uploader = this.uploader as any

      // 将用户所选的文件添加到上传列表中
      // 一旦开始上传，它就会按照列表中添加的顺序开始上传
      uploader.addFile(imageFile, null, null, null, '{"Vod":{}}')
      uploader.addFile(videoFile, null, null, null, '{"Vod":{}}')

      // 开始上传，触发 onUploadstarted 事件
      uploader.startUpload()
    }
  }
})
</script>

<style lang="scss" scoped></style>
