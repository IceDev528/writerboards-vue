<!-- This will be converted to a search results page -->
<template>
  <div>
		<!-- <p>{{ results.length }} groups were found: </p> -->
		<div v-for="result in results" :key="result.id" class="result">
			<div class="post card">
				<h5 class='card-header'>
					<router-link :to="{ name: 'GroupShow', params: { id: result.id } }">
						{{ result.name }}
					</router-link>
				</h5>
				<p class='card-text ml-2'>{{ result.description }}</p>
				<button class="btn btn-primary btn-rounded" @click="createMembership(result)">Click to join the Group</button>
			</div>
				<br>
		</div>

		<div v-if="noResults">
			Sorry, but no results were found. I blame myself.
		</div>
  </div>
</template>

<script>
import GroupsService from '@/services/GroupsService'
import MembershipsService from '@/services/MembershipsService'
export default {
  name: 'SearchGroups',
	data () {
    return {
			term:'',
			results:[],
			noResults:false,
			searching:false
    }
  },
  mounted() {
    this.search();
    window.analytics.page('Group Search') // from segment.io docs
  },
	methods:{
		search: async function() {
      this.searching = true;
      let response = await GroupsService.getAllGroups()
			console.log('in Search Groups, search response is: ', response);
			this.results = response;
      this.searching = false;
    },
    async createMembership(group) {
      await MembershipsService.addMembership({
        membership: {
          groupId: group.id, // need to fix hard coding the id
					userId: this.$store.getters.user.id //need to secure this server side
        }
			});
			this.$store.commit("setCurrentGroup", group);
      this.$emit("membership-created");
			console.log('membership created');
			this.$router.push('/')
    }
  }
}
</script>