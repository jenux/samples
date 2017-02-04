<template>
  <div>
    <div class="alert" v-bind:class="{'alert-success': this.isSuccessful, 'alert-danger': this.isError}">
      <p>Display Bootstrap notification box</p>
    </div>

    <p><button class="btn btn-primary" v-on:click="toggleClass">Toggle</button></p>
  </div>
</template>

<script>
  export default {
    name: 'HelloBindClass',
    data () {
      return {
        isSuccessful: true,
        isError: false
      }
    },
    methods: {
      toggleClass: function () {
        if (this.isSuccessful) {
          this.isSuccessful = false
          this.isError = true
        } else {
          this.isSuccessful = true
          this.isError = false
        }
      }
    }
  }
</script>
