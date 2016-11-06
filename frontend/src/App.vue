<template>
  <div>
    <top-menu></top-menu>
    <div class="container-fluid">
      <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>
      <vue-toastr ref="toastr"></vue-toastr>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import TopMenu from './components/TopMenu'
  import {getHeader, apiDomain} from './config'
  import Toastr from 'vue-toastr'

  require('vue-toastr/src/vue-toastr.less')

  export default {
    data () {
      return {}
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
      const userObj = JSON.parse(window.localStorage.getItem('authUser'))
      this.$store.dispatch('setUserObject', userObj)
    },

    watch: {
      $route () {
        const userObj = JSON.parse(window.localStorage.getItem('authUser'))

        if (userObj !== null) {
          this.$http.get(apiDomain + '/users/' + userObj.id, { headers: getHeader() })
            .then(response => {
              // console.log(response.data.data.id)
            })
            .catch(rejected => {
              window.localStorage.removeItem('authUser')
              this.$store.dispatch('setUserObject', null)
              this.$router.push({name: 'loginPage'})
              this.showAlert('e', 'Please sign in or register!', 'Unauthorized')
            })
        }
      }
    },

    methods: {
      showAlert (type, message, title) {
        this.$refs.toastr[type](message, title)
      }
    },

    mounted () {
      this.$events.listen('userLoggedIn', eventData => {
        this.showAlert(eventData.type, eventData.message, eventData.title)
      })

      this.$events.listen('userLoggedOut', eventData => {
        this.showAlert(eventData.type, eventData.message, eventData.title)
      })

      this.$events.listen('userRegistered', eventData => {
        this.showAlert(eventData.type, eventData.message, eventData.title)
      })
    }
  }
</script>

<style lang="sass">
  @import './assets/css/main.css';
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-active
    opacity: 0
</style>
