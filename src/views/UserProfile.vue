<template>
  <div class="ui container">
    <img v-if="!!user.avatar_url" class="ui medium rounded image" :src="user.avatar_url">
    <img v-else :src="'https://robohash.org/'+ user.username" class="ui medium rounded image"/>
    <h2>
      {{ user.username }} 
      <router-link 
        :to="{ name: 'UserProfileSettings' }" 
        class="ml-5" 
        data-toggle="tooltip" 
        title="Edit your profile"
        v-show="userOwnsProfile"
      >
        <i class="fas fa-edit"></i>
      </router-link>
    </h2>
    <strong>Location: </strong> {{ user.location }}
    <p><strong>Bio: </strong>{{ user.bio }}</p>
    <p v-if="!!user.groups"><strong>Groups ({{ user.groups.length }}): </strong>
      <ul id="example-1">
        <li v-for="group in user.groups" :key="group.id">
          <router-link 
            :to="{ name: 'GroupShow', params: { id: group.id } }" 
          >
          {{ group.name }}
          </router-link>
        </li>
      </ul>
    </p>
    <!-- <ActsList /> -->
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
import ActsList from '@/components/Acts/ActsList'
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {}
    }
  },
  computed: {
    userOwnsProfile() {
      return this.user.id === this.$store.getters.user.id
    }
  },
  mounted () {
    this.getUserById ()
  },
  methods: {
    async getUserById () {
      const response = await UsersService.getUserById({
        id: this.$route.params.id
      })
      this.user = response.data;
    }
  },
  components: {
    ActsList
  }
}
</script>