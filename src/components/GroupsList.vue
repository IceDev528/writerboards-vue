<template>
  <table class="ui celled table">
    <thead>
      <tr>
        <th scope="col">
          {{ user.username }}'s Groups
            <div class='float-right' data-toggle="tooltip" title="Find a Group" >
              <router-link :to="{ name: 'SearchGroups' }">
                <i class="fas fa-search"></i>
              </router-link>
              <!-- <router-link :to="{ name: 'GroupNew' }" class="ml-3" data-toggle="tooltip" title="Create a Group" >
                <i class="fas fa-plus"></i>
              </router-link> -->
            </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(group) in groups" :key="group.id" id="groups" >
        <td
            :class="{ selected: isSelected(group) }" 
            @click="selectGroup(group)">
          <div class="content" >      
            <router-link class="group-list-item" :to="`/groups/${group.id}`">{{group.name}}</router-link>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import UsersService from '@/services/UsersService'
import GroupsService from '@/services/GroupsService'
export default {
  name: "GroupsList",
  data() {
    return {
      user: {},
      groups: [],
      selectedGroup: {}
    }
  },
  async mounted () {
    await this.getUserById();
    this.selectGroup(this.groups[0]);
  },
  computed: {
    me() {
      return this.$store.getters.user
    }
  },
  methods: {
    async getUserById () {
      const response = await UsersService.getUserById({
        id: this.me.id
      })
      this.user = response.data;
      console.log('in GroupsList getUserById, this user is: ', this.user);
      this.groups = this.user.groups;
      console.log('in GroupsList getUserById, this user has ', this.groups.length, 'memberships.');
    },
    selectGroup(group) {
      console.log(group);
      this.selectedGroup = group;
      this.$store.commit("setCurrentGroup", group);
      this.$store.dispatch("updateLeaderboard", this.$store.getters.currentGroup);
    },
    isSelected(group) {
      return this.selectedGroup.id === group.id;
    }
  }
};
</script>

<style scoped lang="scss" >
#groups {
  .selected {
    border: 4px solid gray;
    size: 1.5em;
    background-color: lightgray;
  }
}
</style>