<template>
    <div id="dashboard">
        <h2>Dashboard</h2>
        <h4>{{ userStore.authUser.name }}, {{ userStore.authUser.email }}</h4>

        <!-- <vue-toastr ref="toastr"></vue-toastr> -->
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  // import Toastr from 'vue-toastr'

  // require('vue-toastr/src/vue-toastr.less')

  export default {
    name: 'dashboard-page',

    data () {
      return {
        userStore: ''
      }
    },

    components: {
      // 'vue-toastr': Toastr
    },

    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },

    methods: {
      showAlert (type, message, title) {
        this.$refs.toastr[type](message, title)
      }
    },

    created () {
      // console.log(this.$route)
    }
  }
</script>

<style lang="css" scoped>
</style>
