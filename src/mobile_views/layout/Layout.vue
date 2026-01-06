<template>
    <div>
        <div class="mobile-header" style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: #fff; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <language-switcher></language-switcher>
        </div>
        <div style="margin-top: 50px;">
            <app-main></app-main>
        </div>
        <bottombar style="position:fixed;bottom:0;"></bottombar>
    </div>
</template>

<script>
import Bottombar from './components/Bottombar'
import AppMain from './components/AppMain'
import LanguageSwitcher from '@/components/LanguageSwitcher'
export default {
  name: 'MobileLayout',
  components: {
    Bottombar,
    AppMain,
    LanguageSwitcher
  }
}
</script>

<style>
.mobile-border{
    border-top:1px solid #E4E7ED;
    border-bottom:1px solid #E4E7ED;
}
.mobile-border-top{
    border-top:1px solid #E4E7ED;
}
.mobile-margin-top{
    margin-top: 10px;
}
</style>
