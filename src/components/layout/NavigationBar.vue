<template>
  <b-navbar toggleable="lg" variant='primary' type='dark'>
    <b-navbar-toggle target='nav_collapse'></b-navbar-toggle>
    
    <b-navbar-brand to='/' >WriterBoards</b-navbar-brand>

    <b-collapse is-nav id='nav_collapse' >
      <b-navbar-nav v-if='isAuthenticated'>
        <!-- <b-nav-item :to="{ name: 'GroupNew' }">Create a Group</b-nav-item> -->
        <!-- <b-nav-item :to="{ name: 'SearchGroups' }">Find a Group</b-nav-item> -->
        <b-nav-item :to="`/users/${me.id}`" class="float-right">{{ me.username }}</b-nav-item>
        <b-nav-item @click="logout">Sign Out</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else>
        <b-nav-item to='/login'>Sign In</b-nav-item>
        <b-nav-item to='/signup'>Sign Up</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
import UsersService from '@/services/UsersService'
export default {
  name: 'NavigationBar',
  data: function() {
    return  {
      user: {}
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    // the following seems WRONG!! Should be able to use user object, but that f's the group list
    email() {
      return this.$store.state.user.email;
    },
    me() {
      return this.$store.getters.user
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    },
    async getUser () {
      const response = await UsersService.getUserById({
        id: this.me.id
      })
      console.log('In NavBar, username from getUser: ', response.data.username)
      this.user = response.data;
    }
  }
}
</script>