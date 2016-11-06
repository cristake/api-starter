<template>
  <div class="container" id="login-wrapper">
    <form class="form-signin" @submit.prevent="handleLogIn">
      <legend><i class="fa fa-key"></i> Please sign in</legend>

      <form-error v-if="errors.message" :errors="errors">
        {{ error }}
      </form-error>

      <div class="form-group" :class="errors.message ? ' has-error' : ''" id="inputEmail">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required autofocus
          v-model = "loginForm.email"
        >
      </div>

      <div class="form-group" :class="errors.message ? ' has-error' : ''" id="inputPassword">
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          v-model = "loginForm.password"
        >
      </div>

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
  import {mapState} from 'vuex'
  import {loginUrl, getHeader, apiDomain} from './../config'
  import {grantType, clientId, clientSecret} from './../.env'
  import FormError from './../components/FormError'

  export default {
    name: 'login-page',

    components: {
      FormError
    },

    data () {
      return {
        loginForm: {
          email: '',
          password: ''
        },
        errors: []
      }
    },

    created () {
      if (this.userIsLoggedIn()) {
        this.$router.push({name: 'dashboard'})
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
            // console.log(response.data)

            if (response.status === 200) {
              authUser.access_token = response.body.access_token
              authUser.refresh_token = response.body.refresh_token
            }

            window.localStorage.setItem('authUser', JSON.stringify(authUser))

            this.$http.get(apiDomain + '/user', { headers: getHeader() })
              .then(response => {
                // console.log(response.data.user)

                authUser.id = response.data.user.id
                authUser.name = response.data.user.name
                authUser.email = response.data.user.email

                // save user obj to local storage
                window.localStorage.setItem('authUser', JSON.stringify(authUser))

                // store the state of the user
                this.$store.dispatch('setUserObject', authUser)

                // fire an event
                this.$events.fire('userLoggedIn', {type: 's', message: 'Logare cu succes!', title: 'Success!'})

                // redirect user after login
                this.$router.push({name: 'dashboard'})
              })
          })
          .catch(rejected => {
            this.errors = rejected.body
          })
      },

      userIsLoggedIn () {
        return window.localStorage.getItem('authUser')
      }
    },

    computed: {
      ...mapState({
        userStore: state => state.userStore
      }),

      error () {
        console.log(this.errors.message)
        return this.errors.message
      }
    }
  }
</script>

<style lang="css" scoped>
  body {
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #065065;
  }

  .form-signin {
    max-width: 400px;
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
