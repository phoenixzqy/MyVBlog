<template>
  <div class="language-switcher">
    <el-dropdown @command="handleLanguageChange" trigger="click">
      <span class="el-dropdown-link">
        <el-icon><Expand /></el-icon>
        {{ currentLanguageName }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh">
            {{ $t('language.chinese') }}
          </el-dropdown-item>
          <el-dropdown-item command="en">
            {{ $t('language.english') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { setLanguage } from '@/utils/language'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { Expand } from '@element-plus/icons-vue'

export default {
  name: 'LanguageSwitcher',
  components: {
    Expand
  },
  setup () {
    const { t, locale } = useI18n()

    const currentLanguageName = computed(() => {
      return locale.value === 'zh' ? t('language.chinese') : t('language.english')
    })

    const handleLanguageChange = (lang) => {
      locale.value = lang
      setLanguage(lang)
    }

    return {
      currentLanguageName,
      handleLanguageChange
    }
  }
}
</script>

<style scoped>
.language-switcher {
  display: inline-block;
  cursor: pointer;
}

.el-dropdown-link {
  color: #606266;
  font-size: 14px;
}

.el-dropdown-link:hover {
  color: #409EFF;
}
</style>
