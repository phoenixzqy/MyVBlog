<template>
    <div style="min-height: 600px" v-loading="loading">
        <el-card shadow="never" style="min-height: 400px">
            <template v-slot:header>
<div >
                <el-row>
                    <el-col :span="12">
                        <span>{{project.name}}</span>
                    </el-col>
                    <el-col :span="12">
                        <div style="text-align: right;">
                            <el-button @click="$share()" style="padding: 3px 0" type="text" :icon="Share">分享</el-button>
                            <el-button @click="goGithub(project.url)" style="padding: 3px 0" type="text" :icon="Back">前往GitHub</el-button>
                            <el-button @click="more" style="padding: 3px 0" type="text" :icon="MoreFilled">更多项目</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
</template>
            <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                {{ $t('common.published') }} {{project.createTime}}
                <br> {{ $t('common.updated') }} {{project.updateTime}}
            </div>
            <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 20px 0px 0px 0px">
                {{project.description}}
            </div>
            <div style="font-size: 1.1rem;color: #303133;padding: 15px 0px 15px 0px;border-bottom: 1px solid #E4E7ED;">
                <el-row>
                    <el-col :span="16"  style="padding-top: 5px">
                        <el-tooltip effect="dark" :content="'star '+project.stargazersCount" placement="bottom">
                            <el-icon style="margin: 0px 5px 0px 0px"><Star /></el-icon>
                        </el-tooltip>
                        {{project.stargazersCount}}
                        <el-tooltip effect="dark" :content="'watch '+project.watchersCount" placement="bottom">
                            <el-icon style="margin: 0px 5px 0px 15px"><View /></el-icon>
                        </el-tooltip>
                        {{project.watchersCount}}
                        <el-tooltip effect="dark" :content="'fork '+project.forksCount" placement="bottom">
                            <el-icon style="margin: 0px 5px 0px 15px"><Bell /></el-icon>
                        </el-tooltip>
                        {{project.forksCount}}
                    </el-col>
                    <el-col :span="8" style="text-align: right">

                        <el-tag size="small" type="danger" v-if="project.license">{{project.license}}</el-tag>
                        <el-tag size="small" type="success">{{project.language}}</el-tag>
                    </el-col>

                </el-row>

            </div>
            <div v-html="project.content" v-if="project.content" class="markdown-body" style="padding-top: 20px"></div>
            <div v-if="!project.content" style="padding: 20px 0px 20px 0px;text-align: center">
                <span style="font-size: 30px;color:#dddddd ">
                    <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
                </span>
            </div>
        </el-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProjectApi from '@/api/project'
import { Share, Back, MoreFilled, Star, View, Bell } from '@element-plus/icons-vue'
export default {
  components: {
    Share,
    Back,
    MoreFilled,
    Star,
    View,
    Bell
  },
  data () {
    return {
      Share,
      Back,
      MoreFilled,
      project: {
        name: ''
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  mounted () {
    this.loading = true
    this.project.name = this.$route.params.name
    ProjectApi.single(this.project.name).then((response) => {
      const result = response.data
      const base64 = require('js-base64').Base64
      this.project.id = result.id
      this.project.url = result.html_url
      this.project.stargazersCount = result.stargazers_count
      this.project.watchersCount = result.watchers_count
      this.project.forksCount = result.forks_count
      this.project.language = result.language
      this.project.description = result.description
      this.project.license = result.license ? result.license.spdx_id : null
      this.project.content = this.$markdown(base64.decode(result.readme_content))
      this.project.createTime = this.$util.utcToLocal(result.created_at)
      this.project.updateTime = this.$util.utcToLocal(result.updated_at)
    }).catch(() => this.loading = false).then(() => this.loading = false)
  },
  methods: {
    goGithub (url) {
      window.open(url)
    },
    more () {
      this.$router.push('/user/project/main')
    }
  }
}
</script>
