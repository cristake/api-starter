<template>
  <div class="container" id="register-wrapper">
    <form class="form-register" @submit.prevent="handleRegister">
      <h2 class="form-register-heading"><i class="fa fa-key"></i> Create a new account</h2>

      <form-error v-if="errors.message" :errors="errors">
        {{ error }}
      </form-error>

      <div class="form-group" :class="errors.message ? ' has-error' : ''" id="inputName">
        <label for="inputName" class="sr-only">Name</label>
        <input
          type="text"
          id="inputname"
          class="form-control"
          placeholder="Name"
          required autofocus
          v-model = "registerForm.name"
        >
      </div>

      <div class="form-group" :class="errors.message ? ' has-error' : ''" id="inputEmail">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          v-model = "registerForm.email"
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
          v-model = "registerForm.password"
        >
      </div>

      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {registerUrl, loginUrl, getHeader, apiDomain} from './../config'
  import {grantType, clientId, clientSecret} from './../.env'
  import FormError from './../components/FormError'

  export default {
    name: 'register-page',

    components: {
      FormError
    },

    data () {
      return {
        registerForm: {
          name: '',
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
      handleRegister () {
        // this.errors = false

        const postData = {
          name: this.registerForm.name,
          email: this.registerForm.email,
          password: this.registerForm.password
        }

        this.$http.post(registerUrl, postData)
          .then(response => {
            // console.log(response.data.user)

            if (response.status === 200) {
              const registerData = {
                grant_type: grantType,
                client_id: clientId,
                client_secret: clientSecret,
                username: this.registerForm.email,
                password: this.registerForm.password,
                scope: ''
              }

              const authUser = {}

              this.$http.post(loginUrl, registerData)
                .then(response => {
                  // console.log(response)

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
                      this.$events.fire('userRegistered', {type: 's', message: 'Te-ai inregistrat cu succes!', title: 'Success!'})

                      // redirect user after login
                      this.$router.push({name: 'dashboard'})
                    })
                })
                .catch(rejected => {
                  console.log(this.errors)
                  this.errors = rejected.body
                })
            }
          })
          .catch(rejected => {
            console.log(rejected.data)
            this.errors = rejected.data
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

  .form-register {
    max-width: 400px;
    padding: 15px;
    margin: 0 auto;
  }
  .form-register .form-register-heading,
  .form-register .checkbox {
    margin-bottom: 10px;
  }
  .form-register .checkbox {
    font-weight: normal;
  }
  .form-register .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }
  .form-register .form-control:focus {
    z-index: 2;
  }
  .form-register input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-register input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
