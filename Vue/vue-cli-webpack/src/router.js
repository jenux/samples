import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import { routes as AppRoutes } from './app/'
import { routes as HelloWorldRoutes } from './hello-world/'

let routes = [
  ...AppRoutes,
  ...HelloWorldRoutes
]

let router = new Router({
  routes: routes
})

export { routes, router }
