<template>
</template>

<script>
export default {
  name: 'logout-page',

  data () {
    return {

    }
  },

  created () {
    window.localStorage.removeItem('authUser')

    this.$store.dispatch('setUserObject', null)

    // fire an event
    this.$events.fire('userLoggedOut', {type: 's', message: 'Delogare cu succes!', title: 'Success!'})

    this.$router.push({name: 'loginPage'})
  }
}
</script>

<style lang="css" scoped>
</style>
