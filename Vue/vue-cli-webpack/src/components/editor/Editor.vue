<template>
  <div>
    <p>
      <router-link to="/editor">aa</router-link>
      <router-link to="/editor/log">bb</router-link>
    </p>
    <div class="row">
      <div class="col-md-3">
        <sidebar></sidebar>
      </div>
      <div class="col-md-9">
        <router-view></router-view>
        <list></list>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Router from 'vue-router'
  import _ from 'lodash'

  Vue.use(Router)

  import router from '../../router'
  import Sidebar from './Sidebar'
  import List from './List'
  import Log from './Log'

  export default {
    name: 'editor',
    data () {

    },
    components: {
      'sidebar': Sidebar,
      'list': List,
      'log': Log
    },
    beforeRouteEnter: function (to, from, next) {
      let item = _.find(router.options.routes, function (e) {
        return e.component.name === 'editor'
      })
      item.children = [
        {
          path: '/log',
          component: Log
        }
      ]
      next()
    },
    beforeRouteUpdate: function (to, from, next) {
      next()
    }
  }
</script>
