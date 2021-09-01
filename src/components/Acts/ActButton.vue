<template>
  <div class="">
    <button class="btn btn-success col-md-12" :disabled="actedToday" @click="createAct('Writing')">I wrote today!</button>
    <!-- <div class="btn btn-outline-warning col-md-6" @click="createAct('Editing')">I edited today!</div> -->
  </div>
</template>

<script>
import ActsService from '@/services/ActsService'
export default {
  name: "ActButton",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    };
  },
  computed: {
    kudos() {
      return this.$store.getters.kudos
    },
    actedToday() {
      if (!!this.$store.getters.lastAct) {
        let now = new Date();
        console.log('In ActButton.vue, this is now in actedToday computed: ', now);
        let lastActDate = new Date(this.$store.getters.lastAct.created_at);
        console.log('In ActButton.vue, this is last act date in computed actedToday', this.$store.getters.lastAct.created_at);
        console.log('In ActButton.vue, was last Act today? ', lastActDate.getTime() > now.setHours(0,0,0,0));
        
        return lastActDate.getTime() > now.setHours(0,0,0,0)
      }
    }
  },
  mounted() {
    this.$store.dispatch("getKudos");
    this.$store.dispatch("getLastAct");
  },
  methods: {
    async createAct (action) {
      console.log('In ActButton.vue, act button clicked')
      let result = await ActsService.addAct({
        act: {
          deed: action,
          userId: this.user.id // needs to be token eventually
        }
      });
      this.$emit("act-created");
      window.analytics.track('Act recorded', {
        deed: action,
        user: this.user.username
      });
      this.displayNotice();
      console.log('In ActButton.vue, what we got back from acts button click: ',result);
      this.$store.dispatch("getLastAct");
      this.$store.dispatch("getUserActs");
    },
    displayNotice() {
      let phrase = this.getRandom(this.kudos).phrase
      this.$snotify.warning(phrase,{
        timeout: 2500,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        icon: false,
        position: "centerTop"
      })
    },
    getRandom(list) {
      return list[Math.floor((Math.random()*list.length))];
    }
  }
};
</script>
