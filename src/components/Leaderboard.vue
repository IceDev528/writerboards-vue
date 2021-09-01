<template>
  <div class="table-responsive mt-2">
    <table class="ui celled table">
      <thead>
        <tr><th colspan="4">Leaderboard for {{ currentGroup.name }} (last {{ currentGroup.points_horizon }} days)</th></tr>
        <tr>
          <th>Username</th>
          <th>Last Action</th>
          <th>Date</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(leader) in leaderboard" :key="leader.users_id">
          <td>
            <h4 class="ui image header">
              <img v-if="leader.avatar_url" :src="leader.avatar_url"  class="ui mini rounded image">
              <img v-else :src="'https://robohash.org/'+ leader.username" class="ui mini rounded image"/>
              <router-link :to="`/users/${leader.users_id}`" class="content">
                {{leader.username}}
              </router-link>
            </h4>
          </td>
          <td>{{ lastUserAct.deed }}</td>
          <td></td>
          <!-- <td>{{ lastAct(leader.id).deed }}</td>
          <td>{{ moment(lastAct(leader.id).created_at).strftime("%A, %d %b %Y %l:%M %p") }}</td> -->
          <td>{{leader.count}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment-strftime'
import _ from 'lodash'
import ReportsService from '@/services/ReportsService'
import ActsService from '@/services/ActsService'
export default {
  name: "Leaderboard",
  data() {
    return {
      lastUserAct: {}
    }
  },
  computed: {
    leaderboard () {
      return this.$store.getters.leaderboard;
    },
    currentGroup () {
      return this.$store.getters.currentGroup;
    }
    // ,
    // lastAct (userId) {
    //   return _.orderBy(this.actsByUser(userId), 'created_at')[0];
    // }
  },
  mounted () {
    this.getLeaderboard();
  },
  methods: {
    getLeaderboard: async function () {
      console.log('in LeaderBoard, this is currentGroup: ', this.$store.getters.currentGroup.name)
      this.$store.dispatch("updateLeaderboard", this.currentGroup);
    },
    moment: function (datetime) {
      return moment(datetime);
    }
    ,
    async lastActByUser (leader_id) {
      console.log('in Leaderboard, getting last act for user')
      const response = await ActsService.fetchLastActByUser ({
        userId: leader_id
      });
      this.lastUserAct = response.data
      console.log('in Leaderboard, lastAct response: ', response.data)
    }
  }
};
</script>