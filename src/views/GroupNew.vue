<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
      <h2 class="ui dividing header">Create your group!</h2>

      <Notification
        :message="notification.message"
        :type="notification.type"
        v-if="notification.message"
      />

      <form class="ui form" @submit.prevent="createGroup">

        <div class="field">
          <label>Name</label>
          <input type="text" name="name" v-model="name" placeholder="Name">
        </div>

        <div class="field">
          <label>Group Location</label>
          <LocationAutoForm />
        </div>

        <div class="field">
          <label>Description</label>
          <textarea name="description" v-model="description" rows="4" placeholder="Describe this group"></textarea>
        </div>

        <div class="field">
          <label>Maximum Group Size</label>
          <input type="number"  name="max_members" v-model="max_members" placeholder="defaults to 10">
        </div>

        <div class="field">
          <b-form-checkbox
            id="checkbox-1"
            v-model="private_group"
            name="checkbox-1"
            value='true'
            unchecked-value='false'
          >
            This group is private
          </b-form-checkbox>
        </div>
        <button type="submit" class="fluid ui primary button">Create Group</button>
      </form>
    </div>
  </div>
</template>

<script>
import GroupsService from '@/services/GroupsService'
import MembershipsService from '@/services/MembershipsService'
import LocationAutoForm from '@/components/LocationAutoForm'
export default {
  name: 'GroupNew',
  components: {
    Notification,
    LocationAutoForm
  },
  data () {
    return {
      name: '',
      description: '',
      max_members: Number,
      private_group: 'false',
      location:{},
      notification: {
        message: '',
        type: ''
      }
    }
  },
  mounted() {
    window.analytics.page('Group New') // from segment.io docs
  },
  methods: {
    makeCurrentMember: function (group) {
      console.log('in GroupNew, making current user member of new group: ')
      let result = MembershipsService.addMembership({
        membership: {
          groupId: group.data.id,
          userId: this.$store.getters.user.id //need to secure this server side
        }
      });
      this.$emit("membership-created");
      console.log('membership creates');
    },
    async createGroup () {
      let result = await GroupsService.createGroup({
        group: {
          name: this.name,
          description: this.description,
          max_members: this.max_members,
          private_group: this.private_group,
          address: this.$store.state.location.formatted_address,
          latitude: this.$store.state.location.geometry.location.lat(),
          longitude: this.$store.state.location.geometry.location.lng()
        }
      });
      this.$emit("group-created");
      console.log('in GroupNew, this is the result object after group is created', result.data);
      this.makeCurrentMember(result);
      this.$router.push({name: 'Home'});
      console.log('this is the address entered: ', this.$store.state.location.formatted_address)
      console.log('this is the longitude entered: ', this.$store.state.location.geometry.location.lng())
    }
  }
}
</script>


