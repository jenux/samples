<template>
  <nav>
    <ul class="nav">
      <li v-for="route in routes">
        <router-link v-bind:to="route.path">{{route.name}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { routes } from './index'

  export default {
    name: 'hello-world_sidebar',
    data () {
      let p = routes[0]
      let c = p.children.map(item => {
        item.path = p.path + '/' + item.path
        return item
      })

      return {
        routes: [p, ...c]
      }
    }
  }
</script>
