<template>
  <div>
    <router-link
     v-if="$route.path !== '/time-entries/log-time'"
     to="/time-entries/log-time"
     class="btn btn-primary">Create
    </router-link>

    <div v-if="$route.path === '/time-entries/log-time'">
      <h3>Create</h3>
    </div>

    <hr>

    <router-view></router-view>

    <div class="time-entries">
      <p v-if="!plans.length"><strong>No any plan found yet.</strong></p>

      <div class="list-group">
        <a class="list-group-item" v-for="(plan, index) in plans">
          <div class="row">
            <div class="col-sm-2 user-details">
              <img :src="plan.avatar" class="avatar image-circle image-responsive" />
              <p class="text-center">
                <strong>{{ plan.name }}</strong>
              </p>
            </div>
            <div class="col-sm-2 text-center time-block">
              <h3 class="list-group-item-text total-time">
                <i class="glyphicon glyphicon-time"></i>
                {{ plan.totalTime }}
              </h3>
              <p class="label label-primary text-center">
                <i class="glyphicon glyphicon-calendar"></i>
                {{ plan.date }}
              </p>
            </div>

            <div class="col-sm-7 comment-section">
              <p>{{ plan.comment }}</p>
            </div>

            <div class="col-sm-1">
              <button 
               class="btn btn-xs btn-danger delete-button"
               @click="deletePlan(index)">X</button>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "TimeEntries",
    computed: {
      plans () {
        return this.$store.state.list
      }
    },
    methods: {
      deletePlan(idx) {
        this.$store.dispatch('decTotalTime', this.plans[idx].totalTime)

        this.$store.dispatch('deletePlan', idx)
      }
    }
  }
</script>

<style>
.avatar {
  height: 75px;
  margin: 10px auto;
}
.user-details {
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  margin: -10px 0;
}
.time-block {
  padding: 10px;
}
.comment-section {
  padding: 20px;
}
</style>
