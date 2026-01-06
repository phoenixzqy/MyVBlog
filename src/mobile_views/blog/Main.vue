<template>
    <div :style="'background: #f8f8f8;min-height: '+windowSize.height+'px'">
        <van-nav-bar
            style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -3px 10px #888888;width: 100%;"
            :title="$t('nav.blog')"
            :right-text="$t('common.share')"
            @click-right="$mobileShare()" />
        <div style="height: 60px;"></div>

        <van-list
            v-model:loading="loading"
            :finished="finished"
            :finished-text="$t('common.noMore')"
            :immediate-check="true"
            @load="onLoad"
        >
            <router-link :to="`/mobile/user/blog/details/${item.id}`" v-for="(item,index) in blogs" :key="'p'+index">
                <van-cell-group inset style="margin-bottom: 10px;">
                    <van-cell :title="item.title" :label="$t('common.updateTime') + ' ' + item.updateTime">
                        <template #default>
                            <div class="blog-item" style="padding-top: 8px; color: #888; font-size: 0.9rem;">
                                {{$util.cutStr(item.description,50)}}
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </router-link>
        </van-list>

        <div style="height: 100px;"></div>

    </div>
</template>

<script>
import GistApi from '@/api/gist'
import { showToast, closeToast } from 'vant'
export default {
  name: 'MobileBlogMain',
  data () {
    return {
      windowSize: this.$util.getWindowSize(),
      query: {
        page: 1,
        pageSize: 50,
        pageNumber: 1
      },
      searchKey: '',
      blogs: [],
      loading: false,
      finished: false
    }
  },
  mounted () {
    // Initial load will be handled by van-list
  },
  methods: {
    onLoad () {
      // Show loading toast using functional API
      showToast({
        type: 'loading',
        duration: 0,
        forbidClick: true,
        message: this.$t('common.loading')
      })

      GistApi.list(this.query).then((response) => {
        const result = response.data
        const pageNumber = this.$util.parseHeaders(response.headers)
        if (pageNumber) {
          this.query.pageNumber = pageNumber
        }
        if (result.length === 0) {
          this.finished = true
          this.loading = false
          return
        }
        for (let i = 0; i < result.length; i++) {
          const files = result[i].files
          const firstKey = Object.keys(files)[0]
          if (firstKey) {
            const data = {}
            data.title = firstKey
            data.url = files[firstKey]
            data.description = result[i].description
            data.id = result[i].id
            data.createTime = this.$util.utcToLocal(result[i].created_at)
            data.updateTime = this.$util.utcToLocal(result[i].updated_at)
            this.blogs.push(data)
          }
        }
        this.loading = false
        if (result.length < this.query.pageSize) {
          this.finished = true
        }
        this.query.page++
      }).catch((error) => {
        console.error('Error loading blog list:', error)
        this.loading = false
        this.finished = true
        // Error toast is already shown by the axios interceptor
      }).finally(() => {
        // Clear loading toast
        closeToast()
      })
    },
    search () {
      // Mobile search functionality can be implemented with filtered computed properties if needed
    }
  }
}
</script>
