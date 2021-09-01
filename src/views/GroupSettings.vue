<template>
  <div class="ui stackable grid container ">
    <!-- <GroupSettingsMenu /> -->

    <div class="eight wide column">
      <div class="ui segment">

        <div v-if="userOwnsGroup">
          <h2 class="ui dividing header">
            Edit Group (last updated: {{ group.last_updated }}) 
            <router-link 
              :to="{ name: 'GroupShow' }" 
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
          <form class="ui form" v-if="!!group" @submit.prevent="updateGroup">

            <div class="field">
              <label>Name</label>
              <input type="text" name="name" v-model="group.name" placeholder="Name">
            </div>

            <div class="field">
              <label>Group Location (current location: {{ group.address }})</label>
              <LocationAutoForm />
            </div>

            <div class="field">
              <label>Description</label>
              <textarea name="description" v-model="group.description" rows="4" placeholder="Describe this group"></textarea>
            </div>

            <div class="field">
              <label>Leaderboard Horizon (days)</label>
              <input type="number"  name="points_horizon" v-model="group.points_horizon" placeholder="defaults to 14">
            </div>

            <div class="field">
              <label>Maximum Group Size</label>
              <input type="number"  name="max_members" v-model="group.max_members" placeholder="defaults to 10">
            </div>

            <div class="field">
              <b-form-checkbox
                id="checkbox-1"
                v-model="group.private_group"
                name="checkbox-1"
                value='true'
                unchecked-value='false'
              >
                This group is private
              </b-form-checkbox>
            </div>

            <button type='submit' class="ui button primary">Update group</button>
          </form>
        </div>
        <h2 v-else> You do not have permission to edit this group </h2>
      </div>
    </div>
  </div>
</template>

<script>
import GroupsService from '@/services/GroupsService';
import Notification from "@/components/global/Notification";
import LocationAutoForm from '@/components/LocationAutoForm';
// import GroupSettingsMenu from "@/components/Group/Settings/GroupSettingsMenu";
import moment from 'moment-strftime';

export default {
  name: "GroupSettings",
  components: {
    Notification,
    LocationAutoForm
    // GroupSettingsMenu
  },
  data() {
    return {
      group: {},
      // last_updated: '',
      notification: {
        message: "",
        type: ""
      }
    };
  },
  computed: {
    userOwnsGroup() {
      return this.group.owners_id === this.$store.getters.user.id
    }
  },
  created () {
    this.getGroupById(this.$route.params.id)
    this.location = this.$store.state.location;
  },
  methods: {
    async getGroupById (id) {
      const response = await GroupsService.getGroupById({
        id: this.$route.params.id
      })
      this.group = response.data;
      console.log('this is the group retrieved', this.group)
    },
    async updateGroup () {
      console.log('location object is: ', this.$store.state.location)
      await GroupsService.updateGroup({
        id: this.$route.params.id,
        group: this.group,
        address: this.$store.state.location.formatted_address,
        latitude: this.$store.state.location.geometry.location.lat(),
        longitude: this.$store.state.location.geometry.location.lng()
      })
      this.$router.push({ name: 'GroupShow', params: { groupId: this.group.id }})
    }
  }
};
</script>