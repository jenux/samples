// src/main.js

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import store from './store'
import Home from './components/Home'
import TimeEntries from './components/TimeEntries'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{
  path: '/',
  component: Home
}, {
  path: '/home',
  component: Home
}, {
  path: '/time-entries',
  component: TimeEntries,
  children: [{
    path: 'log-time',
    component: resolve => require(['./components/LogTime.vue'], resolve),
  }]
}];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
