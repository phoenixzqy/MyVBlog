<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item v-for="item in filteredRoutes"
                :key="item.path" :to="item.path" :icon="item.meta.icon">
                {{getTranslatedTitle(item.meta.title)}}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { constantRouterMap } from '@/router'
export default {
  name: 'MobileBottombar',
  data () {
    return {
      constantRouterMap,
      active: 0
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'githubUsername',
      'mini'
    ]),
    filteredRoutes () {
      return this.constantRouterMap.filter(item => {
        return item.meta &&
          item.meta.type === 'mobile' &&
          (this.token || !item.meta.LoginRequired) &&
          (!this.mini || !item.meta.mini)
      })
    }
  },
  watch: {
    active: function () {
      this.$router.push(this.active)
    }
  },
  methods: {
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
    onSelect () {
      this.$router.push(this.active)
    }
  }
}
</script>
