<template>
<div class="form-horizontal">
  <div class="form-group">
    <div class="col-sm-6">
      <label>Date</label>
      <input type="date"
        class="form-control"
        v-model="date"
        placeholder="Date">
    </div>
    <div class="col-sm-6">
      <label>Time</label>
      <input type="number"
        class="form-control"
        v-model="totalTime"
        placeholder="Hours">
    </div>
  </div>


  <div class="form-group">
    <div class="col-sm-12">
      <label>More</label>
      <input type="text"
        class="form-control"
        v-model="comment"
        placeholder="Comment">
    </div>

    <button class="btn btn-primary" @click="save()">Save</button>
    <router-link to="/time-entries" class="btn btn-danger">Cancel</router-link>
    <hr>
  </div>
</div>
</template>


<script>
  export default {
    name: 'LogTime',
    data() {
      return {
        date: '',
        totoalTime: '',
        comment: ''
      }
    },
    methods: {
      save() {
        const plan = {
          name: 'Jenux',
          image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256',
          date: this.date,
          totalTime: this.totalTime,
          comment: this.comment
        };
        this.$store.dispatch('addTotalTime', this.totalTime)
        this.$store.dispatch('savePlan', plan)
        this.$router.go(-1)
      }
    }
  }
</script>
