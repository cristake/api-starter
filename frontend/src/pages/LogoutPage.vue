<template>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {
    window.localStorage.removeItem('authUser')
    this.$router.push({name: 'loginPage'})
  }
}
</script>

<style lang="css" scoped>
</style>