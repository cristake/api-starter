import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'

Vue.use(VueRouter)
Vue.use(VueResource)
/* eslint-disable no-new */
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
  // console.log('Login page ', to)
  // Dont allow to visit login page if authenticated
  if (requiresAuth()) {
    if (userIsLoggedIn()) {
      if (to.name === 'loginPage') {
      }
      next()
    } else {
      next({name: 'loginPage'})
    }
  } else {
    if (userIsLoggedIn() && to.path === '/login') {
      next({name: 'dashboard'})
    }
  }
  next()
})

new Vue({
  router
}).$mount('#app')
