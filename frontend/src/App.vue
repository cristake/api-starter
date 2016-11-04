<template>
  <div>
    <!-- <pre>{{ userStore }}</pre> -->
    <!-- <top-menu v-if="requireMenu"></top-menu> -->
    <top-menu></top-menu>
    <div class="container-fluid">
        <router-view></router-view>
        <vue-toastr ref="toastr"></vue-toastr>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import TopMenu from './components/TopMenu'
  import Toastr from 'vue-toastr'

  require('vue-toastr/src/vue-toastr.less')

  export default {
    data () {
      return {

      }
    },

    components: {
      'top-menu': TopMenu,
      'vue-toastr': Toastr
    },

    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },

    created () {
      // console.log('I was created')
      const userObj = JSON.parse(window.localStorage.getItem('authUser'))
      this.$store.dispatch('setUserObject', userObj)
    },

    mounted () {
      this.showAlert('type')
    },

    methods: {
      showAlert (options) {
        const cont = {
          type: 's',
          message: '',
          title: null
        }
        this.$refs.toastr[cont.type](cont.message, cont.title + '! <i class="fa fa-key"></i>')
      }
    }
  }
</script>

<style lang="sass">
  @import './assets/css/main.css';
</style>
