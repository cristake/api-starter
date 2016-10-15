
<template>
  <div>
    <top-menu v-if="requireMenu"></top-menu>
    <div class="container-fluid">
        <router-view></router-view>
        <vue-toastr ref="toastr"></vue-toastr>
    </div>
  </div>
</template>

<script>
import TopMenu from './components/TopMenu'
import Toastr from 'vue-toastr'

require('vue-toastr/src/vue-toastr.less')

export default {

  data () {
    return {
      requireMenu: true
    }
  },
  components: {
    'top-menu': TopMenu,
    'vue-toastr': Toastr
  },
  created () {
  },
  mounted () {
    this.showAlert('type')
  },
  computed: {
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