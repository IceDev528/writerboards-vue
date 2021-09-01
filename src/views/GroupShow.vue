<template>
  <div class="ui container">
    <h2>{{ group.name }}
      <router-link 
        :to="{ name: 'GroupSettings' }" 
        class="ml-5" 
        data-toggle="tooltip" 
        title="Edit this group"
        v-show="isGroupOwner"
      >
        <i class="fas fa-edit"></i>
      </router-link>
    </h2>
    <span v-if="!groupIsFull">
      <button @click="createMembership()" v-show="!belongsToGroup" >Join Group</button>
    </span>
    <span v-else>This group is full</span> <br>
    <button @click="deleteMembership()" v-show="belongsToGroup">Leave Group</button>
    <p class="mt-2">Location: {{ group.address }}</p>
    <p>Description: {{ group.description }}</p>
    <p v-if="!!group.user">Members ({{ group.user.length }}): 
      <ul id="example-1">
        <li v-for="user in group.user" :key="user.id">
          {{ user.username }}
          <a v-show="isGroupOwner" v-if="user.id != currentUser.id" flat color="grey" @click="deleteUserMembership(user.id)" data-toggle="tooltip" title="Expel this member.">
            <i class="fa fa-trash ml-3" ></i>
          </a>
          <span v-if="user.id === group.owners_id">(Owner)</span>
        </li>
      </ul>
    </p>
    <Leaderboard  />
  </div>
</template>

<script>
import GroupsService from '@/services/GroupsService'
import MembershipsService from '@/services/MembershipsService'
import Leaderboard from '@/components/Leaderboard'
export default {
  name: 'GroupShow',
  components: {
    Leaderboard
  },
  data () {
    return {
      group: {}
    }
  },
  computed: {
    // get current user and check to see if they belong to this group
    belongsToGroup() {
      return this.$lodash.find(this.group.user, {
        "id": this.$store.getters.user.id
      }) !== undefined
    },
    groupIsFull() {
      return this.group.user.length >= this.group.max_members
    },
    isGroupOwner() {
      return this.group.owners_id === this.$store.state.user.id
    },
    currentUser() {
      return this.$store.state.user
    }
  },
  async mounted () {
    await this.getGroupById ();
    this.setGroup(this.group);
    window.analytics.page('Group Page') // from segment.io docs
    window.analytics.track('Group Visited', {
      title: this.group.name
    });
  },
  methods: {
    async getGroupById () {
      const response = await GroupsService.getGroupById({
        id: this.$route.params.id
      })
      console.log('In GroupShow, this group (retrieved from Express) is: ', response.data );
      this.group = response.data;
    },
    setGroup(group) {
      this.$store.commit("setCurrentGroup", group);
    },
    async createMembership() {
      let result = await MembershipsService.addMembership({
        membership: {
          groupId: this.group.id,
          userId: this.$store.getters.user.id //need to secure this server side
        }
      });
      this.$emit("membership-created");
      this.setGroup(this.group);
      await this.getGroupById ();
      console.log('finish membership create process in Vue subject to restrictions in Express');
      window.analytics.track('Group Joined', {
        title: this.group.name,
        user: this.$store.getters.user.username
      });
    },
    async deleteMembership() {
      console.log('in GroupShow, Delete embership, this.group.id is: ', this.group.id)
      await MembershipsService.deleteMembership({
        membership: {
          groupId: this.group.id,
          userId: this.$store.getters.user.id
        }
      });
      window.analytics.track('Group Unjoined', {
        title: this.group.name,
        user: this.$store.getters.user.username
      });
      this.$emit("membership-deleted");
      await this.getGroupById ();
      console.log('membership hs been deleted');
    },
    async deleteUserMembership(id) {
      console.log('in GroupShow, Expel member, this.group.id is: ', this.group.id)
      await MembershipsService.deleteMembership({
        membership: {
          groupId: this.group.id,
          userId: id
        }
      });
      window.analytics.track('Group Unjoined', {
        title: this.group.name,
        user: this.$store.getters.user.username
      });
      this.$emit("membership-deleted");
      await this.getGroupById ();
      console.log('membership hs been deleted');
    }
  }
}
</script>
