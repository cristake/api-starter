import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'
import VueEvents from 'vue-events'
// import Toastr from 'vue-toastr'

import App from './App'

global.jQuery = require('jquery')
require('./assets/js/dependencies.js')

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueEvents)

Vue.component('app', App)

import {routes} from './routes'

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  const authUser = JSON.parse(window.localStorage.getItem('authUser'))

  const userIsLoggedIn = function () {
    return authUser && authUser.access_token
  }

  const requiresAuth = function () {
    return to.meta.requiresAuth
  }

  // Dont allow to visit login page if authenticated
  if (requiresAuth()) {
    if (userIsLoggedIn()) {
      return next()
    } else {
      return next({name: 'loginPage'})
    }
  } else {
    if (userIsLoggedIn() && to.path === '/login') {
      return next({name: 'dashboard'})
    }
  }

  if (userIsLoggedIn() && from.path === '/login') {
    console.log('ok')
  }

  return next()
})

// router.afterEach((to, from) => {
//   console.log('from: ', from)
//   const authUser = JSON.parse(window.localStorage.getItem('authUser'))

//   const userIsLoggedIn = function () {
//     return authUser && authUser.access_token
//   }

//   const showAlert = function (type, message, title) {
//     this.$root.$refs.toastr[type](message, title)
//   }

//   if (userIsLoggedIn() && from.name === 'loginPage') {
//     console.log('logged in')
//     showAlert('s', 'Mesaj de succes!', 'Titlu test')
//   }

//   if (from.name === 'logoutPage') {
//     console.log('logout')
//     // showAlert('s', 'Mesaj de succes!', 'Titlu test')
//   }
// })

new Vue({
  router, store
}).$mount('#app')
