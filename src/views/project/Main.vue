<template>
    <div style="min-height: 600px" v-loading="loading">
        <el-card shadow="never" style="margin-bottom: 20px">
            <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
            <el-button @click="search" :icon="Search" style="margin-left: 10px" circle plain></el-button>
            <el-button @click="$share()" :icon="Share" type="warning" style="margin-left: 10px" plain circle></el-button>
        </el-card>

        <div v-if="projects&&projects.length>0">
            <el-card shadow="hover" v-for="(item,index) in filteredProjects" :key="'pro'+index" style="margin-bottom: 20px">
                <template v-slot:header>
<div >
                    <el-row>
                        <el-col :span="16">
                            <span>
                                <a style="text-decoration:none;cursor:pointer" @click="goDetails(item.name)">
                                    <el-icon><Service /></el-icon>&nbsp;&nbsp; {{item.name}}
                                </a>
                            </span>
                        </el-col>
                        <el-col :span="8">
                            <div style="text-align: right;">
                                <el-button @click="goGithub(item.url)" style="padding: 3px 0" type="text" :icon="Back">前往GitHub</el-button>
                                <el-button @click="$share('/user/project/details/'+item.name)" style="padding: 3px 0" type="text" :icon="Share"></el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
</template>
                <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                    {{ $t('common.updateTime') }} {{item.updateTime}}
                </div>
                <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
                    {{item.description}}
                </div>
                <div style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px">
                    <el-row>
                        <el-col :span="16" style="padding-top: 5px">
                            <el-tooltip effect="dark" :content="'star '+item.stargazersCount" placement="bottom">
                                <el-icon style="margin: 0px 5px 0px 0px"><Star /></el-icon>
                            </el-tooltip>
                            {{item.stargazersCount}}
                            <el-tooltip effect="dark" :content="'watch '+item.watchersCount" placement="bottom">
                                <el-icon style="margin: 0px 5px 0px 15px"><View /></el-icon>
                            </el-tooltip>
                            {{item.watchersCount}}
                            <el-tooltip effect="dark" :content="'fork '+item.forksCount" placement="bottom">
                                <el-icon style="margin: 0px 5px 0px 15px"><Bell /></el-icon>
                            </el-tooltip>
                            {{item.forksCount}}
                        </el-col>
                        <el-col :span="8" style="text-align: right;">
                            <el-tag size="small" type="danger" v-if="item.license">{{item.license}}</el-tag>
                            <el-tag size="small" type="success">{{item.language}}</el-tag>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <div style="text-align: center">
                <el-pagination @current-change="list" background layout="prev, pager, next" v-model:current-page="query.page" :page-size="query.pageSize"
                    :total="query.pageNumber*query.pageSize">
                </el-pagination>
            </div>
        </div>

        <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!projects||projects.length==0">
            <span style="font-size: 30px;color:#dddddd ">
                <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
            </span>
        </el-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProjectApi from '@/api/project'
import { Search, Share, Service, Back, Star, View, Bell } from '@element-plus/icons-vue'
export default {
  components: {
    Search,
    Share,
    Service,
    Back,
    Star,
    View,
    Bell
  },
  data () {
    return {
      Search,
      Share,
      Back,
      query: {
        page: 1,
        pageSize: 5,
        pageNumber: 1
      },
      loading: false,
      searchKey: '',
      projects: []
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ]),
    filteredProjects () {
      if (!this.searchKey) {
        return this.projects.filter(item => item)
      }
      return this.projects.filter(item => {
        return item && item.name && item.name.indexOf(this.searchKey) >= 0
      })
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      this.loading = true
      ProjectApi.list(this.query).then((response) => {
        const result = response.data
        const pageNumber = this.$util.parseHeaders(response.headers)
        if (pageNumber) {
          this.query.pageNumber = pageNumber
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
      }).then(() => this.loading = false)
    },
    search () {
      // Filtered projects will update automatically via computed property
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
