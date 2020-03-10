<template>
  <div id="app">
    <Header logoName="githubäpp." />
    <Search />

    <!--<Bookmark msg="Tere" />-->
  </div>
</template>

<script>
import Header from './bundles/header/headerComponent.vue'
import Search from './bundles/search/searchComponent.vue'
//import Bookmark from './bundles/bookmark/bookmarkComponent.vue'

export default {
  name: 'App',
  components: {
    Header,
    Search,
    //Bookmark
  }
}
</script>
