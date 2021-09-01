<template>
  <div class="row">
    <div class="col-12">
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-lg-8 col-md-6">
              <h3 class="mb-0 text-truncate">{{ this.user.username }}</h3>
              <strong>Location: </strong> {{ this.user.location }}
              <p class="text-truncate" >
                {{ this.user.bio }}
              </p>
              <p class="mb-0">
                <strong>Writing Days: </strong>
                {{ this.acts.length }}
              </p>
              <p class="mb-0">
                <strong>Posts: </strong>
                {{ this.userPosts.length }}
              </p>
            </div>
            <div class="col-12 col-lg-4 col-md-6 text-center">
              <div class="mb-3">
                <img v-if="!!this.user.avatar_url" class="mx-auto rounded-circle img-fluid" :src="this.user.avatar_url">
                <img v-else :src="'https://robohash.org/'+ this.user.username" class="mx-auto rounded-circle img-fluid"/>
              </div>
            </div>
          </div><!--/row-->
        </div><!--/card-block-->
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
export default {
  name: "ProfileCard",
  data: function() {
    return  {
      user: {}
    }
  },
  computed: {
    me() {
      return this.$store.getters.user
    },
    acts () {
      return this.$store.state.userActs;
    },
    userPosts () {
      return this.$store.state.userPosts;
    }
  },
  mounted() {
    this.getUser();
    this.getUserPosts();
  },
  methods: {
    async getUser () {
      const response = await UsersService.getUserById({
        id: this.me.id
      })
      console.log('response from navbar getUser: ', response.data)
      this.user = response.data;
    },
    getUserPosts () {
      const response = this.$store.dispatch('getUserPosts')
    }
  },
}
</script>