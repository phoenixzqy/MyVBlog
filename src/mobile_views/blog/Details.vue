<template>
    <div>
        <van-nav-bar
            style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -5px 10px #888888;width: 100%;"
            :title="blog.title"
            :left-text="$t('common.back')"
            :right-text="$t('common.share')"
            @click-left="$router.go(-1)"
            @click-right="$mobileShare()"
            left-arrow/>
        <div style="height: 60px;"></div>
        <van-cell-group>
            <van-cell :title="$t('common.published')" :value="blog.createTime" />
            <van-cell :title="$t('common.updated')" :value="blog.updateTime" />
        </van-cell-group>
        <div style="font-size: 1.0rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 10px">
            <pre style="font-family: '微软雅黑', sans-serif; white-space: pre-wrap; word-wrap: break-word;">{{blog.description}}</pre>
        </div>
        <div v-html="blog.content" class="markdown-body" style="padding: 10px"></div>
        <div style="height: 100px;"></div>
    </div>
</template>

<script>
import GistApi from '@/api/gist'
export default {
  name: 'MobileBlogDetails',
  data () {
    return {
      blog: {
        id: '',
        title: '',
        content: '',
        description: '',
        createTime: '',
        updateTime: ''
      }
    }
  },
  mounted () {
    this.$toast.loading({
      duration: 0,
      forbidClick: true,
      message: this.$t('common.loading')
    })
    this.blog.id = this.$route.params.id
    GistApi.single(this.blog.id).then((response) => {
      const result = response.data
      const files = result.files
      const firstKey = Object.keys(files)[0]
      if (firstKey) {
        this.blog.title = firstKey
        this.blog.content = this.$markdown(files[firstKey].content)
        this.blog.description = result.description
        this.blog.createTime = this.$util.utcToLocal(result.created_at)
        this.blog.updateTime = this.$util.utcToLocal(result.updated_at)
      }
    }).catch(() => {
      this.$toast.fail(this.$t('common.loadError'))
    }).finally(() => {
      this.$toast.clear()
    })
  },
  methods: {

  }

}
</script>
