<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadCourseImage } from '@/services/course'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null,
      hasValue: false
    }
  },
  watch: {
    value () {
      if (!this.hasValue) {
        ;(this.editor as any).txt.html(this.value)
        this.hasValue = true
      }
    }
  },
  // 组件已经渲染好，可以初始化操作 DOM 了
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      this.editor = editor as any
      // 注意：事件监听必须在 create 之前
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.create()

      // 注意：设置初始化必须在 create 之后
      // editor.txt.html(this.value)

      editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: any) {
        // 1. 把用户选择的 resultFiles 上传到服务端
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)

        // 2. 根据图片地址生成 img 标签插入富文本编辑器内容中
        insertImgFn(data.data.name)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
