<template>
    <div id="dashboard">
        <h2>Dashboard</h2>
        <h4>{{ user.name }}, {{ user.email }}</h4>
    </div>
</template>

<script>
// import {apiDomain, getHeader} from './../config'
export default {

  name: 'dashboard-page',

  data () {
    return {
      user: {name: '', email: ''}
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('authUser'))
    // this.$http.get(apiDomain + 'user', {headers: getHeader()})
    // .then(response => {
    //   this.user = response.data
    // })
  }
}
</script>

<style lang="css" scoped>
</style>