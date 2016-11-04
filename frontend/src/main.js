import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'

import App from './App'

global.jQuery = require('jquery')
require('./assets/js/dependencies.js')

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)

/* eslint-disable no-new */
Vue.component('app', App)

import {routes} from './routes'
// Register vue component

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

  // console.log('Login page ', to)
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

  return next()
})

new Vue({
  router, store
}).$mount('#app')
