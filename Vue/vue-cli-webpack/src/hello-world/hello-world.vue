<template>
  <div class="row">
    <div class="col-md-3" style="border-right:1px dotted #ddd">
      <sidebar></sidebar>
    </div>
    <div class="col-md-9">
      <span v-if="$route.path==='/hello-world'">{{ message }}</span>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from './sidebar'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        message: 'Hello World'
      }
    },
    components: {
      Sidebar
    }
  }
</script>
