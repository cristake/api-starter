<template>
  <div class="container" id="login-wrapper">
    <form class="form-signin" @submit.prevent="handleLogIn">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input 
        type="email" 
        id="inputEmail" 
        class="form-control" 
        placeholder="Email address" 
        required autofocus
        v-model = "loginForm.email"
      >
      <label for="inputPassword" class="sr-only">Password</label>
      <input 
        type="password" 
        id="inputPassword" 
        class="form-control" 
        placeholder="Password" 
        required
        v-model = "loginForm.password"
      >
      <div class="checkbox">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import {loginUrl, getHeader, apiDomain} from './../config'
import {grantType, clientId, clientSecret} from './../.env'

export default {
  components: {
  },
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    console.log('Check is loged')
    if (this.userIsLoggedIn()) {
      this.$router.push({name: 'loginForm'})
    }
  },
  methods: {
    handleLogIn () {
      const postData = {
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret,
        username: this.loginForm.email,
        password: this.loginForm.password,
        scope: ''
      }
      const authUser = {}
      this.$http.post(loginUrl, postData)
      .then(response => {
        if (response.status === 200) {
          authUser.access_token = response.body.access_token
          authUser.refresh_token = response.body.refresh_token
        }
        window.localStorage.setItem('authUser', JSON.stringify(authUser))
        this.$http.get(apiDomain + '/user', { headers: getHeader() })
        .then(response => {
          authUser.name = response.body.name
          authUser.email = response.body.email
          window.localStorage.setItem('authUser', JSON.stringify(authUser))
        })
        this.$router.push({name: 'dashboard'})
      })
    },
    userIsLoggedIn () {
      return window.localStorage.getItem('authUser')
    }
  }
}
</script>

<style scoped>
  body {
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #eee;
  }

  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }
  .form-signin .checkbox {
    font-weight: normal;
  }
  .form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
