<template>
    <div :style="'background: #f8f8f8;min-height: '+windowSize.height+'px'">
        <van-nav-bar
            style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -3px 10px #888888;width: 100%;"
            :title="$t('nav.projects')"
            :right-text="$t('common.share')"
            @click-right="$mobileShare()" />
        <div style="height: 60px;"></div>

        <van-list
            v-model:loading="loading"
            :finished="finished"
            :finished-text="$t('common.noMore')"
            @load="onLoad"
        >
            <router-link :to="`/mobile/user/project/details/${item.name}`" v-for="(item,index) in projects" :key="'p'+index" style="text-decoration:none;cursor:pointer">
                <van-cell-group inset style="margin-bottom: 10px;">
                    <van-cell :title="item.name" :label="$t('common.updateTime') + ' ' + item.updateTime" class="project-item">
                        <template #default>
                            <div style="padding: 7px 0;color: #303133;font-size: 0.9rem">{{item.description}}</div>
                            <van-row>
                                <van-col span="12" style="font-size: 0.8rem;padding-top: 4px;color: #606266">
                                    <van-icon name="like-o" />&nbsp;{{item.stargazersCount}}&emsp;
                                    <van-icon name="share-o" />&nbsp;{{item.forksCount}}
                                </van-col>
                                <van-col span="12" style="text-align: right">
                                    <van-tag plain type="danger" v-if="item.license">{{item.license}}</van-tag>
                                    <van-tag plain type="primary">{{item.language}}</van-tag>
                                </van-col>
                            </van-row>
                        </template>
                    </van-cell>
                </van-cell-group>
            </router-link>
        </van-list>

        <div style="height: 100px;"></div>

    </div>
</template>

<script>
import ProjectApi from '@/api/project'
export default {
  name: 'MobileProjectMain',
  data () {
    return {
      windowSize: this.$util.getWindowSize(),
      query: {
        page: 1,
        pageSize: 20,
        pageNumber: 1
      },
      searchKey: '',
      projects: [],
      loading: false,
      finished: false
    }
  },
  mounted () {
    // Initial load will be handled by van-list
  },
  methods: {
    onLoad () {
      this.list()
    },
    list () {
      this.loading = true
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: this.$t('common.loading')
      })
      ProjectApi.list(this.query).then((response) => {
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
          const item = result[i]
          const data = {}
          data.id = item.id
          data.name = item.name
          data.url = item.html_url
          data.description = item.description
          data.stargazersCount = item.stargazers_count
          data.watchersCount = item.watchers_count
          data.forksCount = item.forks_count
          data.language = item.language
          data.license = item.license ? item.license.spdx_id : null
          data.createTime = this.$util.utcToLocal(item.created_at)
          data.updateTime = this.$util.utcToLocal(item.updated_at)
          this.projects.push(data)
        }
        this.loading = false
        if (result.length < this.query.pageSize) {
          this.finished = true
        }
      }).catch(() => {
        this.loading = false
        this.finished = true
      }).finally(() => {
        this.$toast.clear()
      })
    },
    search () {
      // Mobile search functionality can be implemented with filtered computed properties if needed
    },
    goDetails (name) {
      this.$router.push('/user/project/details/' + name)
    },
    goGithub (url) {
      window.open(url)
    }
  }
}
</script>
