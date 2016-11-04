<template>
  <div class="container" id="register-wrapper">
    <form class="form-register" @submit.prevent="handleRegister">
      <h2 class="form-register-heading"><i class="fa fa-key"></i> Create a new account</h2>

      <div class="form-group" id="inputName">
        <label for="inputName" class="sr-only">Name</label>
        <div v-if="errors" class="alert alert-danger">
          <!-- <li>{{ error }}</li> -->
          <span>{{ errors.body.message }}</span>
        </div>
        <input
          type="text"
          id="inputname"
          class="form-control"
          placeholder="Name"
          required autofocus
          v-model = "registerForm.name"
        >
      </div>

      <div class="form-group" id="inputEmail">
        <label for="inputEmail" class="sr-only">Email address</label>
        <div v-if="errors" class="alert alert-danger">
          <!-- <li>{{ error }}</li> -->
          <span>{{ errors.body.message }}</span>
        </div>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required autofocus
          v-model = "registerForm.email"
        >
      </div>

      <div class="form-group" id="inputPassword">
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

  export default {
    name: 'register-page',

    components: {
    },

    data () {
      return {
        registerForm: {
          name: '',
          email: '',
          password: ''
        },
        errors: false
      }
    },

    created () {
      if (this.userIsLoggedIn()) {
        this.$router.push({name: 'dashboard'})
      }
    },

    methods: {
      handleRegister () {
        this.errors = false

        const postData = {
          name: this.registerForm.name,
          email: this.registerForm.email,
          password: this.registerForm.password
        }

        this.$http.post(registerUrl, postData)
          .then(response => {
            if (response.status === 200) {
              console.log(response)

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
                  console.log(response)

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
                      this.$store.dispatch('setUserObject', authUser)
                      this.$router.push({name: 'dashboard'})
                    })
                })
                .catch(rejected => {
                  this.errors = rejected
                })
            }
          })
          .catch(rejected => {
            this.errors = rejected
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
        console.log(this.errors.body.message)
        this.error = this.errors.body.message
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
