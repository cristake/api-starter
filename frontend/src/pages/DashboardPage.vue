<template>
    <div id="dashboard">
        <h2>Dashboard</h2>
        <h4>{{ userStore.authUser.name }}, {{ userStore.authUser.email }}</h4>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'dashboard-page',

    data () {
      return {
        // user: {name: '', email: ''}
      }
    },

    created () {
      // this.user = JSON.parse(window.localStorage.getItem('authUser'))
    },

    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    }
  }
</script>

<style lang="css" scoped>
</style>
