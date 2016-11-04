<template>
  <div id="top-menu-wrapper">

    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" :to="{ name: 'home'}">{{ appName }}</router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

          <!-- NAVBAR LEFT -->
          <ul class="nav navbar-nav">

            <router-link tag="li" to="/dashboard" v-if="userStore.authUser !== null">
              <a>Dashboard</a>
            </router-link>

            <!-- DROPDOWN MENU -->
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">Separated link</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>

          <!-- SEARCH FORM -->
          <form class="navbar-form navbar-left">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search">
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
          </form>

          <!-- NAVBAR RIGHT -->
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown" v-if="userStore.authUser !== null">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                {{ userStore.authUser !== null ? userStore.authUser.name : '' }}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <router-link tag="li" to="/logout" v-if="userStore.authUser !== null">
                  <a>Sign Out</a>
                </router-link>
              </ul>
            </li>

            <router-link tag="li" to="/login" v-if="userStore.authUser == null">
              <a>Sign In</a>
            </router-link>

            <router-link tag="li" to="/register" v-if="userStore.authUser == null">
              <a>Register</a>
            </router-link>
          </ul>

        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {appName} from './../.env'

  export default {
    name: 'top-menu',

    data () {
      return {
        appName
      }
    },

    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    }
  }
</script>

<style lang="css">
  body { padding-top: 70px; }
</style>
