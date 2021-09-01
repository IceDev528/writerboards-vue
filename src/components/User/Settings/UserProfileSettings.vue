<template>
  <div class="ui stackable grid container ">
    <!-- <UserSettingsMenu /> -->

    <div class="eight wide column">
      <div class="ui segment">

        <div v-if="userOwnsProfile">
          <h2 class="ui dividing header">
            Edit Profile (last updated: {{ user.last_updated }}) 
            <router-link 
              :to="{ name: 'UserProfile' }" 
              class="float-right" 
              data-toggle="tooltip" 
              title="Go back" 
            >
              <i class="fas fa-long-arrow-alt-left"></i>
            </router-link>
          </h2>

          <!-- <Notification
            :message="notification.message"
            :type="notification.type"
            v-if="notification.message"
          /> -->
          <form class="ui form" v-if="!!user" @submit.prevent="updateUser">
            <div class="field" :class="{ error: errors.has('username') }">
              <label>Username</label>
              <input type="text" name="username" v-model="user.username" v-validate="'required'" />
              <!-- <span v-show="errors.has('username')" class="is-danger">{{ errors.first('username') }}</span> -->
            </div>

            <div class="field">
              <label>Bio</label>
              <textarea v-model="user.bio" rows="5" placeholder="Add a brief bio of you"></textarea>
            </div>

            <div class="field">
              <label>Location (current location: {{ user.location }})</label>
              <LocationAutoForm />
            </div>

            <div class="field">
              <label>Avatar URL</label>
              <input type="url" v-model="user.avatar_url" placeholder="Avatar URL" />
            </div>

            <button type='submit' class="ui button primary">Update profile</button>
          </form>
        </div>
        <h2 v-else> You do not have permission to edit this profile </h2>
      </div>
    </div>
  </div>
</template>

// <script>
import UsersService from '@/services/UsersService';
import Notification from "@/components/global/Notification";
import LocationAutoForm from '@/components/LocationAutoForm';
// import UserSettingsMenu from "@/components/User/Settings/UserSettingsMenu";
import moment from 'moment-strftime';

export default {
  name: "UserProfileSettings",
  components: {
    Notification,
    LocationAutoForm
    // UserSettingsMenu
  },
  data() {
    return {
      user: {},
      // last_updated: '',
      notification: {
        message: "",
        type: ""
      }
    };
  },
  computed: {
    userOwnsProfile() {
      return this.user.id === this.$store.getters.user.id
    }
  },
  created () {
    this.getUserById(this.$route.params.id)
  },
  methods: {
    async getUserById (id) {
      const response = await UsersService.getUserById({
        id: this.$route.params.id
      })
      this.user = response.data;
    },
    async updateUser () {
      await UsersService.updateUser({
        id: this.$route.params.id,
        user: this.user,
        location: this.$store.state.location.formatted_address
      })
      this.$router.push({ name: 'UserProfile', params: { userId: this.user.id }})
    }
  }
};
</script>