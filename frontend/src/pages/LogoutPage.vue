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
    this.$router.push({name: 'loginPage'})
  }
}
</script>

<style lang="css" scoped>
</style>
