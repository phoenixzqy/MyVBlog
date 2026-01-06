<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
function isMobile () {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'githubUsername',
      'htmlTitle'
    ])
  },
  created () {
    this.$store.dispatch('Init')
    this.$store.dispatch('GetInfo')
    this.$setTitle(this.$route.meta.title)
    const windowSize = this.$util.getWindowSize()
    if (isMobile()) {
      this.$router.push('/mobile/user/blog')
    } else {
      this.$router.push('/')
    }
  }
}
</script>
