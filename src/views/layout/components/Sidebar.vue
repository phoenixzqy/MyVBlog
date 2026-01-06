<template>
    <div>
        <el-card shadow="never">
            <el-menu :default-active="active" @select="onSelect">
                <template v-for="item in constantRouterMap" :key="item.path">
                    <el-menu-item v-if="item.meta&&item.meta.type=='user'&&(token||!item.meta.LoginRequired)&&(!mini||!item.meta.mini)"
                        :index="item.path">
                        <el-icon><component :is="getIcon(item.meta.icon)" /></el-icon>
                        <template #title>
                            <span>{{ getTranslatedTitle(item.meta.title) }}</span>
                        </template>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-card>

        <el-card shadow="never" style="margin-top: 20px;text-align: center">
            <div v-if="!token" style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp; {{ $t('sidebar.tokenNotBound') }}&nbsp;&nbsp;
                <el-button type="text" @click="openTokenDialog">{{ $t('sidebar.bind') }}</el-button>
            </div>
            <div v-if="token" style="font-size: 0.9rem;line-height: 1.5;color: #303133;">
                <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp; {{ $t('sidebar.tokenBound') }}&nbsp;&nbsp;
                <el-button type="text" @click="cancellation">{{ $t('sidebar.logout') }}</el-button>
            </div>
            <div style="margin-top: 10px;text-align: left">
                <el-alert :title="$t('sidebar.tokenAcquisition')" type="info" :description="$t('sidebar.tokenHelp')"
                    :closable="false">
                </el-alert>
            </div>
        </el-card>
        <token-dialog ref="tokenDialog"></token-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { constantRouterMap } from '@/router'
import TokenDialog from '@/views/common/TokenDialog'
import { Star, Iphone, EditPen, Service, Printer, Document, Setting } from '@element-plus/icons-vue'

// Icon mapping from old class names to new components
const iconMap = {
  'el-icon-star-off': Star,
  'el-icon-mobile-phone': Iphone,
  'el-icon-edit-outline': EditPen,
  'el-icon-service': Service,
  'el-icon-printer': Printer,
  'el-icon-document': Document,
  'el-icon-setting': Setting
}

export default {
  components: {
    TokenDialog,
    Star,
    Iphone,
    EditPen,
    Service,
    Printer,
    Document,
    Setting
  },
  data () {
    return {
      constantRouterMap,
      active: '',
      parentUrl: '',
      menuList: []
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'githubUsername',
      'mini'
    ])
  },
  mounted () {
    const arr = this.$route.path.split('/')
    this.active = '/' + arr[1] + '/' + arr[2]
  },
  methods: {
    getIcon (iconClass) {
      return iconMap[iconClass] || Star
    },
    getTranslatedTitle (title) {
      // Map Chinese titles to i18n keys
      const titleMap = new Map([
        ['最新动态', 'menu.latest'],
        ['社交圈', 'menu.social'],
        ['博客列表', 'menu.blogList'],
        ['开源项目', 'menu.openSource'],
        ['使用帮助', 'menu.help'],
        ['README.md', 'menu.readme'],
        ['系统配置', 'menu.settings'],
        ['发表博客', 'menu.publishBlog'],
        ['编辑博客', 'menu.editBlog'],
        ['博客详情', 'menu.blogDetails'],
        ['项目列表', 'menu.projectList'],
        ['项目详情', 'menu.projectDetails'],
        ['用户资料', 'menu.userProfile']
      ])

      const i18nKey = titleMap.get(title)
      return i18nKey ? this.$t(i18nKey) : title
    },
    onSelect (index) {
      this.$router.push(index)
    },
    openTokenDialog () {
      this.$refs.tokenDialog.open(() => {

      })
    },
    cancellation () {
      this.$store.dispatch('Cancellation')
    }
  }
}
</script>
