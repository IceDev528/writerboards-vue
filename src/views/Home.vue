<template>
<div>
  <div v-if="!!currentGroup" >
    <div class="row">
      <div class="col-md-7">
        <ActButton :user="me" v-on:act-created="getLeaderboard" />
        <Leaderboard />
        <GroupsList />
        <CalendarCard />
      </div>
      <div class="col-md-5">
        <ProfileCard :user="me" />
        <UserSidebar :user="me" v-on:post-created="getPosts" v-on:act-created="getLeaderboard"/>
        <div class="ui segment">
          <h2 class="ui medium dividing header">Timeline</h2>

          <Posts
            :posts.sync="posts"
            :auth-user="me"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="twelve wide column">
    <NoGroups />
  </div>
</div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import ProfileCard from '@/components/User/ProfileCard'
import Posts from '@/components/Post/Posts'
import Leaderboard from '@/components/Leaderboard'
import GroupsList from '@/components/GroupsList'
import NoGroups from '@/components/NoGroups'
import ActButton from '@/components/Acts/ActButton'
import CalendarCard from '@/components/CalendarCard'

export default {
  name: 'Home',
  components: {
    UserSidebar,
    ProfileCard,
    Posts,
    Leaderboard,
    GroupsList,
    NoGroups,
    ActButton,
    CalendarCard
  },
  data () {
    return {
      user: {}
    }
  },
  mounted() {
    this.getPosts();
    this.$store.dispatch('getRequestedLoans');
    window.analytics.page('Home') // from segment.io docs
  },
  computed: {
    me() {
      return this.$store.getters.user
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.state.user.username;
    },
    posts() {
      return this.$store.state.posts;
    },
    currentGroup() {
      return this.$store.getters.currentGroup;
    }
  },
  methods: {
    getPosts() {
      this.$store.dispatch("getPosts");
      this.getUserPosts();
    },
    getLeaderboard() {
      this.$store.dispatch("updateLeaderboard", this.$store.getters.currentGroup);
    },
    getUserPosts () {
      const response = this.$store.dispatch('getUserPosts')
    }
  }
}
</script>