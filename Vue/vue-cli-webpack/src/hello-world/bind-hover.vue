<template>
  <div>
    <div v-bind:title="message">
      Hover your mouse over me for a few seconds to see my dynamically bound title!
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloBindHover',
    data () {
      return {
        message: 'You loaded this page on' + new Date()
      }
    }
  }
</script>
