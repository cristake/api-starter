<template>
  <div>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
  export default {
    name: 'not-found',

    data () {
      return {
        msg: 'Sorry! The page doesn\'t exist!'
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
