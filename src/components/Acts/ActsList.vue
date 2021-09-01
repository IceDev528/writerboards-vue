<template>
  <table class="ui celled table">
    <thead>
      <tr>
        <th>Action</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="act in acts" :key="act.id">
        <td>
          <h4 class="ui header">
            {{ act.deed }}
          </h4>
        </td>
        <td>
          <h4 class="ui header">
            {{ moment(act.created_at).strftime("%A, %d %b %Y %l:%M %p") }}
          </h4>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from 'moment-strftime'
export default {
  name: "ActsList",
  data() {
    return {
    }
  },
  computed: {
    acts () {
      return this.$store.getters.userActs;
    }
  },
  mounted() {
    this.$store.dispatch('getUserActs')
  },
  methods: {
    moment: function (datetime) {
      return moment(datetime);
    }
  },
}
</script>