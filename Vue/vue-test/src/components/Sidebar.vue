<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h1 class="text-center">Total</h1>
    </div>

    <div class="panel-body">
      <h1 class="text-center">{{time}} Hours</h1>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      time() {
        return this.$store.state.totalTime
      }
    }
  }
</script>
