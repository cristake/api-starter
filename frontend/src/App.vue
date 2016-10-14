<template>
  <div>
    <top-menu v-if="requireMenu"></top-menu>
    <div class="container-fluid">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopMenu from './components/TopMenu'
export default {

  data () {
    return {
      requireMenu: true
    }
  },
  components: {
    'top-menu': TopMenu
  },
  created () {
    console.log('The app has been create. ')
  },
  computed: {
    
  }
}
</script>

<style lang="css">
  @import './assets/css/bootstrap/dist/css/bootstrap.css'
</style>