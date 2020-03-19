<template>
  <div id="app">
    <app-header logoName="githubäpp." />
    <router-view>
      <search-page></search-page>
      <bookmark-page></bookmark-page>
    </router-view>
  </div>
</template>

<script>
import Header from './bundles/header/headerComponent.vue'
import Search from './bundles/search/searchComponent.vue'
import Bookmark from './bundles/bookmark/bookmarkComponent.vue'

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'search-page': Search,
    'bookmark-page': Bookmark
  }
}
</script>
